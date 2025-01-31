// import { FileWithPreview } from "@/components/Culling/WorkSpaceComponents/CullingDropZone";
// import { FileRejection } from "react-dropzone";

export interface MultipleWorkspaceDataInterface {
  id: string;
  name: string;
  total_size: number;
  created_at: string;
  culling_done: boolean;
  culling_in_progress: boolean;
}

// after successfull culling the backend return this type of data
export interface ImagesMetadataResponse {
  id: string; // UUID as string in the frontend
  name: string;
  file_type: string;
  images_download_path: string;
  images_download_validity: string;
}

export interface SingleWorkspaceDataInterface
  extends MultipleWorkspaceDataInterface {
  temporary_images_urls: ImagesMetadataResponse[];
}

// the backend was returning user storage that how much user used the storage and how much was remaning
export interface GetUserStorageResponseType{
    message:string,
    total_smart_culling_storage:number,
    total_smart_culling_storage_used:string,
    total_smart_share_storage:number,
    total_smart_share_storage_used:string,
}


// ----When the culling was going the task status was returning data in like this form
// Interface for the task id
export interface getTaskStatusProps {
  task_id: string;
}

// Interface for data for task
export interface progressDataInterface {
  state: string;
  status: string;
  progress?: string;
  result?: string;
}


// image preview and higlight compoenent props

export interface SmartCullImagesPreviewProps {
  images: ImagesMetadataResponse[];
  isInGridView: boolean;
}


// ----------------- zustand statet interfaces -----------------------

export interface CullingStore {
  // files: FileWithPreview[];
  // rejectedFiles: FileRejection[];
  workspacesData: MultipleWorkspaceDataInterface[];

  // Uploading images
  uploadedImagesS3Urls: string[];
  // isImagesUploading: boolean;
  // uploadImagesError: string | null;
  // isAlertOpen: boolean;

  // Start culling states
  cullingTaskIds: Record<string, string[]>;

  // for toggling the workspaces view in grid or list view
  toggleView:boolean;

  // Handle to check whether the culling is compoleted or not
  // cullingInProgress: boolean;

  // Setters
  setWorkSpacesData: (
    workSpacesData: MultipleWorkspaceDataInterface[]
  ) => void;
  // setFiles: (
  //   files:
  //     | FileWithPreview[]
  //     | ((prevFiles: FileWithPreview[]) => FileWithPreview[])
  // ) => void;
  // setRejected: (
  //   rejectedFiles:
  //     | FileRejection[]
  //     | ((prevRejected: FileRejection[]) => FileRejection[])
  // ) => void;
  setToggleView: (toggleView:boolean)=>void;
  setUploadedImagesS3Urls: (url: string[]) => void;
  // setIsAlertOpen: (value: boolean) => void;

  // Handling uploads
  // handleUploadImages: ({ workSpaceId }: { workSpaceId: string }) => void;

  // Handling start culling
  setCullingTaskIds: ({
    workSpaceId,
    ids,
  }: {
    workSpaceId: string;
    ids: string[];
  }) => void;

  // Handle delete task ids when culling completed for a specific workspace
  clearCullingTaskIds: (workSpaceId: string) => void;

  // Handle to check whether the culling is compoleted or not
  // setCullingInProgress: (inProgress: boolean) => void;
}
