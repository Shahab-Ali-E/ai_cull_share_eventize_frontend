import { SmartShareStore } from "@/@types/smart-share";
import { create } from "zustand";

const useSmartShareStore = create<SmartShareStore>((set) => ({
  files: [],
  rejectedFiles: [],
  currentEventData: {} as SmartShareStore['currentEventData'], // Initialize with an empty object of expected type
  uploadedImagesUrls: [],
  isImagesUploading: false,
  uploadImagesError: null,
  uploadAlertOpen: false,

  // Setters
  setCurrentEventData: (eventData) => {
    set({ currentEventData: eventData });
  },
  setFiles: (files) => {
    set((state) => ({
      files: typeof files === "function" ? files(state.files) : files,
    }));
  },
  setRejected: (rejectedFiles) => {
    set((state) => ({
      rejectedFiles: typeof rejectedFiles === "function" ? rejectedFiles(state.rejectedFiles) : rejectedFiles,
    }));
  },
  setUploadedImagesUrls: (urls) => {
    set({ uploadedImagesUrls: urls });
  },
  resetStateForEvent: () => {
    set({
      files: [],
      rejectedFiles: [],
      currentEventData: {} as SmartShareStore['currentEventData'],
      uploadedImagesUrls: [],
      isImagesUploading: false,
      uploadImagesError: null,
      uploadAlertOpen: false,
    });
  },
  setUploadAlertOpen: (value) => {
    set({ uploadAlertOpen: value });
  },

  // Handling uploads
  handleUploadImages: async ({ }) => {
    try {
      set({ isImagesUploading: true, uploadImagesError: null });
      // Simulated API call or logic for uploading images
      const uploadedUrls = await new Promise<string[]>((resolve) =>
        setTimeout(() => resolve(["image1.jpg", "image2.jpg"]), 1000)
      );
      set({ uploadedImagesUrls: uploadedUrls });
    } catch (error) {
      set({ uploadImagesError: error instanceof Error ? error.message : "An error occurred" });
    } finally {
      set({ isImagesUploading: false });
    }
  },
}));

export default useSmartShareStore;
 