import { create } from "zustand";
import { persist } from "zustand/middleware";

// API calls
import { CullingStore, MultipleWorkspaceDataInterface } from "@/@types/smart-culling";

const useCullingStore = create<CullingStore, [["zustand/persist", { workspacesData: MultipleWorkspaceDataInterface[]}]]>(
  persist(
  (set) => ({
    toggleView:true,
    uploadedImagesS3Urls: [],
    workspacesData: [],
    
    cullingTaskIds: {},
    cullingInProgress: false,


    // Setters
    setWorkSpacesData: (workSpaces) => set({ workspacesData: workSpaces }),

    setToggleView: () => set((state) => ({ toggleView: !state.toggleView })),

    setUploadedImagesS3Urls: (urls) => set({ uploadedImagesS3Urls: urls }),
   

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
  }),
    {
      name: 'culling-store',
      partialize: (state) => ({workspacesData:state.workspacesData }), // Only persist selected states
    }
  )
);

export default useCullingStore;
