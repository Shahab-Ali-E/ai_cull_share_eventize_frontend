import { create } from "zustand";
import { persist } from "zustand/middleware";

// API calls
import { CullingStore, MultipleWorkspaceDataInterface } from "@/@types/smart-culling";

const useCullingStore = create<CullingStore, [["zustand/persist", { cullingTaskIds: Record<string, string[]>; workspacesData: MultipleWorkspaceDataInterface[]; }]]>(
  persist(
  (set) => ({
    // Initial state
    // files: [],
    // rejectedFiles: [],
    toggleView:true,
    uploadedImagesS3Urls: [],
    workspacesData: [],
    // isImagesUploading: false,
    // uploadImagesError: null,
    // isAlertOpen: false,
    cullingTaskIds: {},
    cullingInProgress: false,


    // Setters
    setWorkSpacesData: (workSpaces) =>
      set({ workspacesData: workSpaces }),
    setToggleView: () => set((state) => ({ toggleView: !state.toggleView })),
    // setFiles: (files) =>
    //   set((state) => ({
    //     files: Array.isArray(files) ? files : files(state.files),
    //   })),
    // setRejected: (rejectedFiles) =>
    //   set((state) => ({
    //     rejectedFiles: Array.isArray(rejectedFiles)
    //       ? rejectedFiles
    //       : rejectedFiles(state.rejectedFiles),
    //   })),
    setUploadedImagesS3Urls: (urls) => set({ uploadedImagesS3Urls: urls }),


    // setIsAlertOpen: (value: boolean) => set({ isAlertOpen: value }),

    // Upload images function
    // handleUploadImages: async ({ workSpaceId }) => {
    //   const { files, setUploadedImagesS3Urls, setFiles } = get();

    //   if (files.length > 0) {
    //     set({ isImagesUploading: true, uploadImagesError: null });

    //     const formData = new FormData();
    //     files.forEach((file) => {
    //       formData.append("images", file);
    //     });

    //     try {
    //       const { data, error } = await uploadCullingImagesToServer({
    //         workSpaceId,
    //         imagesData: formData,
    //       });

    //       if (error) {
    //         set({
    //           uploadImagesError: error,
    //           isImagesUploading: false,
    //           isAlertOpen: true,
    //         });
    //         setFiles([]);
    //       } else {
    //         console.log("data from upload culling", data);
    //         setUploadedImagesS3Urls(data.data);
    //         setFiles([]);
    //       }
    //     } catch {
    //       set({
    //         uploadImagesError:
    //           "An unexpected error occurred while uploading images.",
    //         isImagesUploading: false,
    //         isAlertOpen: true,
    //       });
    //     } finally {
    //       set({ isImagesUploading: false });
    //     }
    //   }
    // },

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
      partialize: (state) => ({ cullingTaskIds: state.cullingTaskIds, workspacesData:state.workspacesData }), // Only persist selected states
    }
  )
);

export default useCullingStore;
