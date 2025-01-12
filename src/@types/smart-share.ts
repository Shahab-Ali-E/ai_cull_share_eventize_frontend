import { FileRejection } from "react-dropzone";

// event data interface 
export interface SmartShareEventDataInterface{
    id: string;
    name: string;
    cover_image:string | File;
    description:string;
    total_size: number;
    created_at: string;
}

// interface for event data per id
export interface SmartShareEventDataByIdInterface extends SmartShareEventDataInterface{
    images_data:string[];
}

// props for side bar of specific event page /smartshare-dashboard/SideBar.tsx
export interface SideBarProps{
    coverImage?:string;
    totalImages?:number;
    description?:string;
    eventId?:string
}

// interface for share event page /smartshare-dashboard/ShareEventPage.tsx
export interface ShareEventPageInterface{
    Eventdata:SmartShareEventDataByIdInterface | undefined;
    error?:string | undefined;
}

// file type
export interface FileWithPreview extends File {
    id: string;
    preview: string;
}


// Interface for zustand state of smart share store
export interface SmartShareStore {
    files: FileWithPreview[];
    rejectedFiles: FileRejection[];
    currentEventData: SmartShareEventDataByIdInterface;

  
    // Uploading images
    uploadedImagesUrls: string[];
    isImagesUploading: boolean;
    uploadImagesError: string | null;
    uploadAlertOpen: boolean;
  
    // Setters
    setCurrentEventData: (
      eventData: SmartShareEventDataByIdInterface
    ) => void;
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
    setUploadedImagesUrls: (url: string[]) => void;
    resetStateForEvent: (eventId: string) => void;
    setUploadAlertOpen: (value: boolean) => void;
  
    // Handling uploads
    handleUploadImages: ({ eventId }: { eventId: string }) => void;
}