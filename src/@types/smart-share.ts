
// event data interface 
export interface SmartShareEventsDataInterface{
    id: string;
    name: string;
    cover_image:string;
    description:string;
    total_size: number;
    created_at: string;
    status:"Not Published" | "Published" | "Pending";
}

// images metadata 
export interface SmartShareImagesMetadata{
    id:string;
    name:string;
    file_type:string;
    image_download_path:string;
    image_download_validity:string;
}

// interface for event data per id
export interface SmartShareEventDataByIdInterface extends SmartShareEventsDataInterface{
    images_data:SmartShareImagesMetadata[];
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
    eventData:SmartShareEventDataByIdInterface | undefined;
    error?:string | undefined;
}

// file type
export interface FileWithPreview extends File {
    id: string;
    preview: string;
}


// Interface for zustand state of smart share store
export interface SmartShareStore {
    currentEventData: SmartShareEventDataByIdInterface;
    toggleView:boolean; 
    eventsData:SmartShareEventsDataInterface[]

    // published task id
    publishedTaskIds:Record<string, string>,

    // Uploading images
    uploadedImagesUrls: string[];

  
    // Setters
    setCurrentEventData: (
      eventData: SmartShareEventDataByIdInterface
    ) => void;
    setToggleView:(
        toggleView:boolean
    )=>void;
    setEventsData: (
        eventsData:SmartShareEventsDataInterface[]
    )=>void;
    setPublishedTaskIds: ({ eventId,taskId}:{eventId:string, taskId:string})=>void;
   
    setUploadedImagesUrls: (url: string[]) => void;
}