"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";

//components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

//icons and images
import { IoCloseCircle, IoCloudUploadOutline } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSmartShareStore from "@/zustand/SmartShare";
import { toast } from "sonner";
import { uploadSmartShareImages } from "@/lib/actions/SmartShare/UploadImages";
import UploadImagesToServerLoading from "@/components/Culling/WorkSpaceComponents/LoadingUploadImageServer";

interface SmartShareDropZoneProps {
  className?: string;
  eventId: string;
}

export interface FileWithPreview extends File {
  id: string;
  preview: string;
}

function SmartShareDropZone({ className, eventId }: SmartShareDropZoneProps) {
  const { setUploadedImagesUrls } = useSmartShareStore(); //zustand store for to get uplaodImage function
  const [files, setFiles] = useState<FileWithPreview[]>([]); // for setting files which are accepcted
  const [, setRejected] = useState<FileRejection[]>([]); // for setting files which are rejected
  const [imagesUploading, setImagesUploading] = useState<boolean>(false); // make it true when uploading images so to show progress bar
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false); // Control the alert visibility
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input

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

  // for handling uploading images
  const handleUploadImagesToServer = async ({
    eventId,
  }: {
    eventId: string;
  }) => {
    if (files.length > 0) {
      setImagesUploading(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const { data, error } = await uploadSmartShareImages({
          eventId: eventId,
          imagesData: formData,
        });

        if (error) {
          toast.error("Sorry, can't upload images", {
            description: error,
          });
        } else {
          console.log("data from upload culling", data);
          setUploadedImagesUrls(data.data);
        }
      } catch {
        toast.error("Sorry, something went wrong while uploading images");
      } finally {
        setFiles([]);
        setImagesUploading(false);
      }
    }
  };
  if (imagesUploading) {
    return <UploadImagesToServerLoading isOpen={imagesUploading} />;
  }

  return (
    <form className={`min-h-[27rem] h-full ${className}`}>
      {files.length === 0 ? (
        <div
          {...getRootProps()}
          className="flex flex-1 w-full h-full justify-center"
        >
          <input {...getInputProps()} />
          <div
            className={`flex flex-col flex-grow w-full min-h-full items-center justify-center p-8 md:p-12 lg:p-16 border-2 border-dashed ${
              isDragActive
                ? "border-primary bg-card"
                : "border-muted-foreground"
            } rounded-lg cursor-pointer transition duration-300 ease-in-out`}
          >
            <IoCloudUploadOutline className="h-14 w-14 md:h-20 md:w-20 text-accent-foreground"/>

            <div className="mt-2 space-y-2 text-center text-primary">
              {isDragActive ? (
                <Label className="text-base font-semibold">
                  Drop your images here
                </Label>
              ) : (
                <Label className="text-sm md:text-base font-semibold">
                  Tap to upload images
                </Label>
              )}
              <br />
              <span className="text-muted-foreground text-sm">
                File must be JPEG, JPG or PNG and up to 40MB
              </span>
            </div>
          </div>
        </div>
      ) : (
        //  File preview section
        <section className="flex flex-col w-full min-h-screen">
          {/* File preview section */}
          <Dialog open={showImagePreviewModal} onOpenChange={handlePreview}>
            <DialogContent className="flex flex-col gap-y-0 w-[88%] md:w-2/5 h-3/4 rounded-sm -ml-2 border-2 overflow-hidden p-0 text-primary max-w-full">
              <DialogHeader className="flex flex-row bg-accent text-primary items-center justify-start rounded-none px-6 py-4">
                <DialogTitle className="text-base md:text-lg font-semibold">
                  Images preview
                </DialogTitle>
              </DialogHeader>

              <DialogDescription className="px-6 py-1 h-full w-full bg-accent overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-rounded-full scrollbar-track-accent">
                {/* <Label className="text-lg font-semibold text-primary border-b pb-3">
                
              </Label> */}
                <ul className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3">
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
                        className="w-6 h-6 md:w-8 md:h-8 rounded-full flex justify-center items-center absolute top-0 right-0 bg-white z-20"
                        onClick={() => removeFile(file.id)}
                      >
                        <IoCloseCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              </DialogDescription>
              <DialogFooter className="border-t border-muted-foreground px-20 py-3 md:px-24 md:py-5 bg-secondary gap-y-3 md:gap-y-0">
                <Button
                  type="button"
                  variant={"secondary"}
                  className="w-full border border-muted-foreground h-10 rounded-sm font-medium text-sm"
                  onClick={handleAddMoreClick}
                >
                  Add more
                </Button>

                <Button
                  type="button"
                  variant={"default"}
                  className="w-full border border-muted-foreground h-10 rounded-sm font-medium text-sm"
                  onClick={() => {
                    handleUploadImagesToServer({ eventId });
                  }}
                >
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Hidden input for file selection */}
          <input {...getInputProps()} ref={fileInputRef} className="hidden" />
        </section>
      )}
    </form>
  );
}

export default SmartShareDropZone;
