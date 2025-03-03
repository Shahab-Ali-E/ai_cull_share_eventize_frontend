import { SmartShareImagesMetadata } from "@/@types/smart-share";
import { create } from "zustand";

interface FaceRecognitionStore {
  images: SmartShareImagesMetadata[]; // Adjust type accordingly
  setImages: (images: SmartShareImagesMetadata[]) => void;
}

export const useFaceRecognitionStore = create<FaceRecognitionStore>((set) => ({
  images: [],
  setImages: (images) => set({ images }),
}));
