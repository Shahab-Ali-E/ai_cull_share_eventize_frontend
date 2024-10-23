import { FileWithPreview } from '@/components/Culling/WorkSpaceComponents/DropZone';
import { uploadCullingImagesToServer } from '@/lib/actions/UploadImagesForCulling';
import { FileRejection } from 'react-dropzone';
import { create } from 'zustand';

interface CullingStore {
  files: FileWithPreview[];
  rejectedFiles: FileRejection[];
  uploadedImagesS3Urls:{url:string}[];
  currentWorkspaceId: number | null;
  isImagesUploading:boolean,
  uploadImagesError:string| null;
  isAlertOpen:boolean

  setFiles: (files: FileWithPreview[] | ((prevFiles: FileWithPreview[]) => FileWithPreview[])) => void;
  setRejected: (rejectedFiles: FileRejection[] | ((prevRejected: FileRejection[]) => FileRejection[])) => void;
  setUploadedImagesS3Urls: (urls:{url:string}[])=>void;
  resetStateForNewWorkspace: (workspaceId: number) => void;
  setIsAlertOpen: (value: boolean) => void;

  //for handling uploads interface
  handleUploadImages:({workSpaceName}:{workSpaceName:string})=>void;

}

const useCullingStore = create<CullingStore>((set,get) => ({
  //getter
  files: [],
  rejectedFiles: [],
  uploadedImagesS3Urls:[],
  currentWorkspaceId: null,
  isImagesUploading:false,
  uploadImagesError:null,
  isAlertOpen:false,

  //setter
  setFiles: (files) => set((state) => ({ files: Array.isArray(files) ? files : files(state.files) })),
  setRejected: (rejectedFiles) => set((state) => ({ rejectedFiles: Array.isArray(rejectedFiles) ? rejectedFiles : rejectedFiles(state.rejectedFiles) })),
  setUploadedImagesS3Urls: (urls)=>set({uploadedImagesS3Urls:urls}),
  resetStateForNewWorkspace: (workspaceId: number) =>
    set((state) => {
      if (state.currentWorkspaceId !== workspaceId) {
        return {
          files: [],
          rejectedFiles: [],
          uploadedImagesS3Urls: [],
          currentWorkspaceId: workspaceId,
        };
      }
      return state;
    }),
  setIsAlertOpen: (value:boolean) => set({isAlertOpen:value}),
    
  // Upload images function
  handleUploadImages: async ({workSpaceName}:{workSpaceName:string}) => {
    const { files, setUploadedImagesS3Urls, setFiles } = get();

    if (files.length > 0) {
      set({ isImagesUploading: true, uploadImagesError: null });

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      try {
        const { data, error } = await uploadCullingImagesToServer({
          workSpaceName,
          imagesData: formData,
        });

        if (error) {
          set({ uploadImagesError: error, isImagesUploading: false, isAlertOpen:true });
        } else {
          setUploadedImagesS3Urls(data.data);
          setFiles([]);
        }
      } catch {
        set({
          uploadImagesError:'An unexpected error occurred while uploading images.',
          isImagesUploading: false,
          isAlertOpen:true
        });
      } finally {
        set({ isImagesUploading: false });
      }
    }
  },
    
}));

export default useCullingStore;
