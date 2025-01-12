"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";

//components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

//icons and images
import { IoCloseCircle } from "react-icons/io5";
import uploaddIcon from "@/images/icons/uploadImageIcon.png";
import useCullingStore from "@/zustand/CullingStore";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

interface SmartShareDropZoneProps {
  className?: string;
  files: FileWithPreview[];
  rejected: FileRejection[];
  setFiles: (
    files:
      | FileWithPreview[]
      | ((prevFiles: FileWithPreview[]) => FileWithPreview[])
  ) => void;
  setRejected: (
    rejectedFiles:
      | FileRejection[]
      | ((prevRejected: FileRejection[]) => FileRejection[])
  ) => void;
  workSpaceId: string;
}

export interface FileWithPreview extends File {
  id: string;
  preview: string;
}

function SmartShareDropZone({
  className,
  files,
  setFiles,
  setRejected,
  workSpaceId,
}: SmartShareDropZoneProps) {
  const { handleUploadImages } = useCullingStore(); //zustand store for to get uplaodImage function
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false); // Control the alert visibility
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input

  const router = useRouter();

  // This function will trigger when the user drops a file on it
  const onDrop = (
    acceptedFiles: FileWithPreview[],
    rejectedFiles: FileRejection[]
  ) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles: FileWithPreview[]) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: crypto.randomUUID(),
          })
        ),
      ]);
    }
    setShowImagePreviewModal(true); // Show alert after successful upload

    if (rejectedFiles?.length) {
      setRejected((previousRejected: FileRejection[]) => [
        ...previousRejected,
        ...rejectedFiles,
      ]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  } as DropzoneOptions);

  // Clean up object URLs on component unmount
  useEffect(() => {
    console.log("files", files);
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  // Remove a specific file
  const removeFile = (id: string) => {
    setFiles((files) => files.filter((file) => file.id !== id));
  };

  // Handle additional image input
  const handleAddMoreClick = () => {
    fileInputRef.current?.click();
  };

  //close the alert dialog
  const handlePreview = (open: boolean | ((prevState: boolean) => boolean)) => {
    setShowImagePreviewModal(open);

    // Remove all files and rejected files
    if (!open) {
      setFiles([]);
      setRejected([]);
    }
  };

  // Truncate file names to avoid overflow
  const truncateFileName = (name: string, maxLength: number): string => {
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  // for handling uploading images
  const handleUploadImagesToServer = ({
    workSpaceId,
  }: {
    workSpaceId: string;
  }) => {
    handleUploadImages({ workSpaceId: workSpaceId });
    router.refresh();
  };

  return (
    <form className={`min-h-[27rem] w-full h-full ${className}`}>
      {files.length === 0 ? (
        <div {...getRootProps()} className="flex h-full w-full">
          <input {...getInputProps()} />
          <div
            className={`flex flex-col items-center justify-center w-full p-8 md:p-12 lg:p-16 border-4 border-dashed ${
              isDragActive
                ? "border-primary bg-card"
                : "border-muted-foreground"
            } rounded-lg cursor-pointer transition duration-300 ease-in-out`}
          >
            <Image
              src={uploaddIcon}
              height={64}
              width={64}
              className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
              alt="upload-logo"
              unoptimized
            />
            <div className="mt-4 space-y-2 text-center text-primary">
              {isDragActive ? (
                <Label className="text-sm sm:text-lg font-semibold">
                  Drop your images here
                </Label>
              ) : (
                <Label className="text-sm sm:text-lg font-semibold">
                  Tap to upload images
                </Label>
              )}{" "}
              <br />
              <span className="text-muted-foreground text-sm">
                File must be JPEG, JPG or PNG and up to 40MB
              </span>
            </div>
          </div>
        </div>
      ) : (
        //  File preview section
        <section className="w-full">
          {/* Hidden input for file selection */}
          <input {...getInputProps()} ref={fileInputRef} className="hidden" />

          <Dialog open={showImagePreviewModal} onOpenChange={handlePreview}>
            <DialogContent className="flex flex-col gap-y-0 w-full h-3/4 rounded-2xl border-2 overflow-hidden p-0 text-primary">
              <DialogHeader className="flex flex-row bg-accent border-b border-muted-foreground text-primary items-center justify-start rounded-t-md space-x-3 px-6 py-3">
                <Button
                  type="button"
                  variant={"secondary"}
                  className="mt-1 border border-muted-foreground bg-secondary"
                  onClick={handleAddMoreClick}
                >
                  Add more
                </Button>

                <Button
                  type="button"
                  className="border border-muted-foreground text-primary bg-card hover:bg-card"
                  onClick={() => {
                    handleUploadImagesToServer({ workSpaceId });
                  }}
                >
                  upload all
                </Button>
              </DialogHeader>

              <DialogDescription className="p-6 h-full w-full bg-accent overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-rounded-full scrollbar-track-accent">
                <Label className="text-lg font-semibold text-primary border-b pb-3">
                  Images Preview
                </Label>
                <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="relative group border rounded-sm overflow-hidden"
                    >
                      <Image
                        src={file.preview}
                        alt={file.name}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                      <button
                        className="w-8 h-8 rounded-full flex justify-center items-center absolute top-0 right-0 bg-white z-20"
                        onClick={() => removeFile(file.id)}
                      >
                        <IoCloseCircle className="w-8 h-8 text-red-600" />
                      </button>
                      <p className="absolute inset-0 flex items-center justify-center text-white text-base font-medium opacity-0 group-hover:opacity-100 bg-opacity-40 bg-black rounded-lg">
                        {truncateFileName(file.name, 15)}
                      </p>
                    </li>
                  ))}
                </ul>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </section>
      )}
    </form>
  );
}

export default SmartShareDropZone;
