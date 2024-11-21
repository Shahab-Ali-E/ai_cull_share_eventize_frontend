import { FileWithPreview } from '@/components/Culling/WorkSpaceComponents/DropZone';
import { FileRejection } from 'react-dropzone';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// API calls
import { uploadCullingImagesToServer } from '@/lib/actions/UploadImagesForCulling';

export interface WorkspaceDataInterface {
  id: string;
  name: string;
  total_size: number;
  created_at: string;
  temporary_images_urls: {
    url: string;
    validity: string;
  }[];
  culling_done:boolean;
  culling_in_progress:boolean;
}


interface CullingStore {
  files: FileWithPreview[];
  rejectedFiles: FileRejection[];
  currentActiveWorkSpaceData: WorkspaceDataInterface;

  // Uploading images
  uploadedImagesS3Urls:string[];
  isImagesUploading: boolean;
  uploadImagesError: string | null;
  isAlertOpen: boolean;

  // Start culling states
  cullingTaskIds: Record<string, string[]>;

  // Handle to check whether the culling is compoleted or not
  // cullingInProgress: boolean;
  
  // Setters
  setCurrentActiveWorkSpaceData: (workSpaceData: WorkspaceDataInterface) => void;
  setFiles: (files: FileWithPreview[] | ((prevFiles: FileWithPreview[]) => FileWithPreview[])) => void;
  setRejected: (rejectedFiles: FileRejection[] | ((prevRejected: FileRejection[]) => FileRejection[])) => void;
  setUploadedImagesS3Urls: (url: string[]) => void;
  resetStateForNewWorkspace: (workspaceId: string) => void;
  setIsAlertOpen: (value: boolean) => void;
  
  // Handling uploads
  handleUploadImages: ({ workSpaceId }: { workSpaceId: string }) => void;
  
  // Handling start culling
  setCullingTaskIds: ({ workSpaceId, ids }: { workSpaceId: string; ids: string[] }) => void;
  
  // Handle delete task ids when culling completed for a specific workspace
  clearCullingTaskIds: (workSpaceId: string) => void;

  // Handle to check whether the culling is compoleted or not
  // setCullingInProgress: (inProgress: boolean) => void;
}

const useCullingStore = create<CullingStore>(
  persist(
    (set, get) => ({
      // Initial state
      files: [],
      rejectedFiles: [],
      uploadedImagesS3Urls: [],
      currentActiveWorkSpaceData: {id:'', created_at:'', name:'', total_size:0, temporary_images_urls:[], culling_done:false, culling_in_progress:false},
      isImagesUploading: false,
      uploadImagesError: null,
      isAlertOpen: false,
      cullingTaskIds: {},
      cullingInProgress: false,

      // Setters
      setCurrentActiveWorkSpaceData: (workSpace) => set({ currentActiveWorkSpaceData: workSpace }),
      setFiles: (files) =>
        set((state) => ({
          files: Array.isArray(files) ? files : files(state.files),
        })),
      setRejected: (rejectedFiles) =>
        set((state) => ({
          rejectedFiles: Array.isArray(rejectedFiles)
            ? rejectedFiles
            : rejectedFiles(state.rejectedFiles),
        })),
      setUploadedImagesS3Urls: (urls) => set({ uploadedImagesS3Urls: urls }),

      resetStateForNewWorkspace: (workspaceId: string) =>
        set((state) => {
          if (state.currentActiveWorkSpaceData.id !== workspaceId) {
            return {
              files: [],
              rejectedFiles: [],
              uploadedImagesS3Urls: [],
              // currentActiveWorkSpaceData: { id: workspaceId, created_at: '', name: '', total_size: 0, temporary_images_urls: [], culling_done:false },
              isImagesUploading: false,
              uploadImagesError: null,
              cullingInProgress:false
            };
          }
          return state;
        }),
        
      setIsAlertOpen: (value: boolean) => set({ isAlertOpen: value }),

      // Upload images function
      handleUploadImages: async ({ workSpaceId }) => {
        const { files, setUploadedImagesS3Urls, setFiles } = get();

        if (files.length > 0) {
          set({ isImagesUploading: true, uploadImagesError: null });

          const formData = new FormData();
          files.forEach((file) => {
            formData.append('images', file);
          });

          try {
            const { data, error } = await uploadCullingImagesToServer({
              workSpaceId,
              imagesData: formData,
            });

            if (error) {
              set({ uploadImagesError: error, isImagesUploading: false, isAlertOpen: true });
            } else {
              console.log('data from upload culling', data);
              setUploadedImagesS3Urls(data.data);
              setFiles([]);
            }
          } catch {
            set({
              uploadImagesError: 'An unexpected error occurred while uploading images.',
              isImagesUploading: false,
              isAlertOpen: true,
            });
          } finally {
            set({ isImagesUploading: false });
          }
        }
      },

      // For setting culling task ids
      setCullingTaskIds: ({ workSpaceId, ids }) =>
        set((state) => ({
          cullingTaskIds: {
            ...state.cullingTaskIds,
            [workSpaceId]: [...(state.cullingTaskIds[workSpaceId] || []), ...ids],
          },
        })),

      // Clear specific culling data
      clearCullingTaskIds: (workSpaceId) =>
        set((state) => {
          const updated = { ...state.cullingTaskIds };
          delete updated[workSpaceId];
          return { cullingTaskIds: updated };
        }),
          
      // for handling to check whether the culling is completed or not
      // setCullingInProgress: (inProgress) => set({ cullingInProgress: inProgress }),
    }),

    {
      name: 'culling-store',
      partialize: (state) => ({ cullingTaskIds: state.cullingTaskIds }), // Only persist cullingTaskIds
    }
  )
);

export default useCullingStore;
