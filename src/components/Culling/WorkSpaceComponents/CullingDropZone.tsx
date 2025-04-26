"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

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
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
// import { uploadCullingImagesToServer } from "@/lib/actions/Culling/UploadImagesForCulling";

// import Iphoneloader from "@/components/uiVerse/iphone-loader";
import { Badge } from "@/components/ui/badge";
// import axios, { AxiosResponse } from "axios";
// import { UPLOAD_CULLING_IMAGES } from "@/constants/ApiUrls";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useAuth } from "@clerk/nextjs";
import UploadingImagesProgress from "@/components/UploadingImagesProgress";
import { useCullingS3Uploader } from "@/hooks/useCullingS3Uploader";

interface CullingDropZoneProps {
  className?: string;
  workSpaceId: string;
  workSpaceName: string;
}

export interface FileWithPreview extends File {
  id: string;
  preview: string;
}

function CullingDropZone({
  className,
  workSpaceId,
  workSpaceName,
}: CullingDropZoneProps) {
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false); // Control the alert visibility
  const [files, setFiles] = useState<FileWithPreview[]>([]); // for setting files which are accepcted
  const [, setRejected] = useState<FileRejection[]>([]); // for setting files which are rejected
  // const [imagesUploading, setImagesUploading] = useState<boolean>(false); // make it true when uploading images so to show progress bar
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input
  // const [progress, setProgress] = useState(0); // 0–100%
  // const [uploadedCount, setUploadedCount] = useState(0); // # files done
  // const [eta, setEta] = useState("0 sec"); // human‑readable time

  // const router = useRouter();
  // const { getToken } = useAuth();

  // This function will trigger when the user drops a file on it
  const onDrop = (
    acceptedFiles: FileWithPreview[],
    rejectedFiles: FileRejection[]
  ) => {
    if (acceptedFiles?.length) {
      // const newFiles = acceptedFiles.map(file => ({
      //   id: uuidv4(),
      //   name: file.name,
      //   size: file.size,
      //   type: file.type,
      //   // Delay preview generation
      //   preview: () => URL.createObjectURL(file) 
      // }));
    
      // setFiles(prev => [...prev, ...newFiles]);
      
      setFiles((previousFiles: FileWithPreview[]) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uuidv4(),
          })
        ),
      ]);
    }
    setShowImagePreviewModal(true); // Show image preview modal after successfull upload

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

  // uploading images
  const { isUploading, progress, uploadedCount, eta, handleUpload } =
  useCullingS3Uploader(workSpaceName, workSpaceId);

  useEffect(() => {
    // whenever uploading starts, hide the modal
    if (isUploading) {
      setShowImagePreviewModal(false);
    }
  }, [isUploading]);

  if (isUploading) {
    return (
      <UploadingImagesProgress
        progress={progress}
        totalFiles={files.length}
        uploadedCount={uploadedCount}
        eta={eta}
      />
    );
  }

  return (
    <form className={`min-h-[27rem] w-full ${className}`}>
      {files.length === 0 ? (
        <div
          {...getRootProps()}
          className="flex flex-grow h-full w-full md:w-4/5 justify-center"
        >
          <input {...getInputProps()} />
          <div
            className={`flex flex-col items-center justify-center w-full p-8 md:p-12 lg:p-16 border-2 border-dashed ${
              isDragActive
                ? "border-primary bg-card"
                : "border-muted-foreground"
            } rounded-lg cursor-pointer transition duration-300 ease-in-out`}
          >
            <IoCloudUploadOutline className="h-14 w-14 md:h-20 md:w-20 text-accent-foreground" />

            <div className="mt-1 space-y-2 text-center text-primary">
              {isDragActive ? (
                <Label className="text-sm md:text-base font-semibold">
                  Drop your images here
                </Label>
              ) : (
                <Label className="text-xs md:text-sm font-semibold">
                  ✨ Get started by uploading images. <br />
                  Simply drag and drop files here 🖼️, or click to select files
                  📁.
                </Label>
              )}{" "}
              <br />
              <span className="text-muted-foreground text-sm">
                File must be JPEG, JPG and PNG
              </span>
            </div>
          </div>
        </div>
      ) : (
        <section className="flex flex-col w-full min-h-screen">
          {/* File preview section */}
          <Dialog open={showImagePreviewModal} onOpenChange={handlePreview}>
            <DialogContent className="flex flex-col gap-y-0 w-[88%] md:w-2/5 h-3/4 rounded-sm -ml-2 md:-ml-0 overflow-hidden p-0 text-primary max-w-full">
              <DialogHeader className="flex flex-row bg-accent text-primary items-center justify-start rounded-none px-6 py-8">
                <DialogTitle className="flex gap-2 items-center">
                  <Label className="text-sm md:text-lg font-semibold">
                    Images preview
                  </Label>

                  <Badge className="flex justify-center rounded-full size-6 text-xs font-bold hover:bg-card-foreground">
                    <span>{files.length}</span>
                  </Badge>
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
                  className="w-full border border-muted-foreground h-10 rounded-sm font-medium text-xs md:text-sm"
                  onClick={handleAddMoreClick}
                >
                  Add more
                </Button>

                <Button
                  type="button"
                  variant={"default"}
                  className="w-full border border-muted-foreground h-10 rounded-sm font-medium text-xs md:text-sm"
                  onClick={() => handleUpload(files)}
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

export default CullingDropZone;
