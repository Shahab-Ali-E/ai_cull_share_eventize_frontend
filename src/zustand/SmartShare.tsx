import {
  SmartShareEventsDataInterface,
  SmartShareStore,
} from "@/@types/smart-share";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSmartShareStore = create<
  SmartShareStore,
  [
    [
      "zustand/persist",
      {
        eventsData: SmartShareEventsDataInterface[];
        publishedTaskIds: Record<string, string>;
      }
    ]
  ]
>(
  persist(
    (set) => ({
      currentEventData: {} as SmartShareStore["currentEventData"], // Initialize with an empty object of expected type
      uploadedImagesUrls: [],
      toggleView: true,
      eventsData: [],
      publishedTaskIds: {},

      // Setters
      setCurrentEventData: (eventData) => {
        set({ currentEventData: eventData });
      },
      setEventsData: (eventsData) => set({ eventsData: eventsData }),
      setToggleView: () => set((state) => ({ toggleView: !state.toggleView })),
      setUploadedImagesUrls: (urls) => {
        set({ uploadedImagesUrls: urls });
      },
      setPublishedTaskIds: ({ eventId, taskId }) => {
        console.log("Setting task ID:", eventId, taskId); // Debugging
        set((state) => ({
          publishedTaskIds: {
            ...state.publishedTaskIds,
            [eventId]: taskId,
          },
        }));
      },
    }),
    {
      name: "smart-share-store",
      partialize: (state) => ({
        eventsData: state.eventsData,
        publishedTaskIds: state.publishedTaskIds,
      }),
    }
  )
);

export default useSmartShareStore;
