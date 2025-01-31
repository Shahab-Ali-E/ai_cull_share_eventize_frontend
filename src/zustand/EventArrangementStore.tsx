import { EventArrangementType } from "@/@types/event-managment";
import { create } from "zustand";


// Zustand store implementation
const useEventArrangementStore = create<EventArrangementType>((set) => ({
  // Getter
  toggleView:true,

  // ---- event arrangment book form states
  // Getters: Initialize default values
  personalInformation: { fullName: "", email: "", phone: "" },
  eventInformation: { eventType: "", eventDate: undefined, numberOfGuests: 0, budget: 0, eventDescription: "" },
  destinationDetails: { selectCountry: "", city: "", alternativeCity: "" },
  additionalInformation: { portFolio: "", specialRequirements: "" },
  loading: false,

  // Setters
  setToggleView:(toggleView)=> set({toggleView:toggleView}),
  
  // ---- event arrangment book form states
  setPersonalInformation: (personalInfo) => set({ personalInformation: personalInfo }),
  setEventInformation: (eventInfo) => set({ eventInformation: eventInfo }),
  setDestinationDetails: (destinationDetails) => set({ destinationDetails }),
  setAdditionalInformation: (additionalInfo) => set({ additionalInformation: additionalInfo }),
  setLoading: (loading) => set({loading:loading}),

  // Reset all fields
  resetForm: () =>
    set({
      personalInformation: { fullName: "", email: "", phone: "" },
      eventInformation: { eventType: "", eventDate: undefined, numberOfGuests: 0, budget: 0, eventDescription: "" },
      destinationDetails: { selectCountry: "", city: "", alternativeCity: "" },
      additionalInformation: { portFolio: "", specialRequirements: "" },
      
    }),
}));

export default useEventArrangementStore;
