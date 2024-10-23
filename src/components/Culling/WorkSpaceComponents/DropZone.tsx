'use client'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDropzone, FileRejection, DropzoneOptions } from 'react-dropzone';

//components
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AlertUploadImage from './AlertUploadImage';

//icons and images
import { IoCloseCircle } from 'react-icons/io5';
import uploaddIcon from '@/images/icons/upload_icon_svg.svg';
import { MdDeleteSweep } from "react-icons/md";
import { FcAddImage } from 'react-icons/fc';
import useCullingStore from '@/zustand/CullingStore';

interface DropZoneProps {
    className?: string;
    files: FileWithPreview[];
    rejected: FileRejection[];
    setFiles: (files: FileWithPreview[] | ((prevFiles: FileWithPreview[]) => FileWithPreview[])) => void;
    setRejected: (rejectedFiles: FileRejection[] | ((prevRejected: FileRejection[]) => FileRejection[])) => void;
    workSpaceName:string;
}

export interface FileWithPreview extends File {
    id: string;
    preview: string;
}

function DropZone({
    className,
    files,
    rejected,
    setFiles,
    setRejected,
    workSpaceName
}: DropZoneProps) {

    const {handleUploadImages} = useCullingStore(); //zustand store for to get uplaodImage function
    
    const [showAlert, setShowAlert] = useState(false); // Control the alert visibility

    const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input

    // This function will trigger when the user drops a file on it
    const onDrop = (acceptedFiles: FileWithPreview[], rejectedFiles: FileRejection[]) => {
        if (acceptedFiles?.length) {
            setFiles((previousFiles: FileWithPreview[]) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file), id: crypto.randomUUID() })
                ),
            ]);
        }
        setShowAlert(true); // Show alert after successful upload

        if (rejectedFiles?.length) {
            setRejected((previousRejected: FileRejection[]) => [
                ...previousRejected,
                ...rejectedFiles
            ]);
        }
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop,
    } as DropzoneOptions);

    // Clean up object URLs on component unmount
    useEffect(() => {
        return () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    // Remove a specific file
    const removeFile = (id: string) => {
        setFiles((files) => files.filter((file) => file.id !== id));
    };

    // Remove all files and rejected files
    const removeAll = () => {
        setFiles([]);
        setRejected([]);
    };

    // Handle additional image input
    const handleAddMoreClick = () => {
        fileInputRef.current?.click();
    };

    //close the alert dialog
    const handlePreview = () => {
        setShowAlert(false);
    };

    // Truncate file names to avoid overflow
    const truncateFileName = (name: string, maxLength: number): string => {
        return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
    };

    return (
        <form className={className}>
        {files.length === 0 ? (
            <div {...getRootProps()} className="inline-flex">
            <input {...getInputProps()} />
            {isDragActive ? (
                <div className="p-16 sm:p-20 md:p-32 lg:p-44 xl:p-52 z-10 rounded-2xl bg-gradient-to-t from-[#ddb5ff] dark:bg-[#4abbb0] transition-all ease-in-out duration-300">
                <Label className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                    Drop files here
                </Label>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-5 p-12 sm:p-16 md:p-24 lg:p-32 xl:pl-72 xl:pr-72 xl:p-32 z-10 rounded-2xl bg-gradient-to-t from-[#ddb5ff] dark:bg-[#62E2D6] transition-all ease-in-out duration-300 cursor-pointer">
                <Image
                    src={uploaddIcon}
                    height={100}
                    width={100}
                    className="sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 xl:h-40 xl:w-40"
                    alt="upload-logo"
                />
                <Label className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-card-foreground">
                    ✨ Get started by uploading images. <br />
                    Simply drag and drop files here 🖼️, or click to select files 📁.
                </Label>
                </div>
            )}
            </div>
        ) : (
            <section className="flex flex-col w-full min-h-screen">
                {/* Alert which tell us do we want to preview the images or directly upload them */}
                <AlertUploadImage 
                    isOpen={showAlert} 
                    onPreview={handlePreview} 
                    onUploadToServer={()=>handleUploadImages({workSpaceName:workSpaceName})}
                />

                {/* File preview section */}
                <div className="flex gap-4">
                    <Button
                        type="button"
                        className="px-7 py-5 gap-x-2 text-base font-medium transform transition-transform duration-300 hover:scale-105"
                        onClick={handleAddMoreClick}
                    >
                        Add More
                        <FcAddImage className="h-6 w-6" />
                    </Button>

                    <Button
                        className="px-7 py-5 gap-x-3 text-base font-medium group transform transition-transform duration-300 hover:scale-105"
                        onClick={removeAll}
                    >
                        Delete All
                        <MdDeleteSweep className="h-6 w-6 text-red-600" />
                    </Button>
                </div>

                {/* Hidden input for file selection */}
                <input {...getInputProps()} ref={fileInputRef} className="hidden" />

                {/* Preview images */}
                <h3 className="title text-lg font-semibold text-primary mt-10 border-b pb-3">
                    Images Preview
                </h3>
                <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
                    {files.map((file) => (
                    <li
                        key={file.id}
                        className="relative h-48 w-52 xl:h-56 xl:w-60 lg:h-56 lg:w-60 md:h-52 md:w-60 rounded-lg shadow-md overflow-hidden group"
                    >
                        <Image
                            src={file.preview}
                            alt={file.name}
                            width={192}
                            height={192}
                            className="h-full w-full object-cover"
                        />
                    <button
                            type="button"
                            className="w-8 h-8 rounded-full flex justify-center items-center absolute top-0 right-0 bg-white hover:scale-110 transition-all ease-in-out z-20"
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
            </section>
        )}
        </form>
    );
    }

    export default DropZone;
