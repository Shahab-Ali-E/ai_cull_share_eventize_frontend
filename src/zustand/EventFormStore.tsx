import { create } from "zustand";

// Interface for Personal Information
interface PersonalInformationType {
  fullName: string;
  email: string;
  phone: string;
}

// Interface for Event Information
interface EventInformationType {
  eventType: string;
  eventDescription?: string | undefined;
  eventDate: Date | undefined;
  numberOfGuests: number;
  budget: number;
}

// Interface for Destination Details
interface DestinationDetailType {
  selectCountry: string;
  city: string;
  alternativeCity: string;
}

// Interface for Additional Information
interface AdditionalInformationType {
  portFolio: string;
  specialRequirements?: string | undefined;
}

// Interface for Review and Submit
interface ReviewAndSubmitType {
  summary: string;
  consent: boolean;
}

// Main interface for Zustand store
interface EventManagementFormType {
  // Getters
  personalInformation: PersonalInformationType;
  eventInformation: EventInformationType;
  destinationDetails: DestinationDetailType;
  additionalInformation: AdditionalInformationType;
  reviewAndSubmit: ReviewAndSubmitType;

  // Setters
  setPersonalInformation: (personalInformation: PersonalInformationType) => void;
  setEventInformation: (eventInformation: EventInformationType) => void;
  setDestinationDetails: (destinationDetails: DestinationDetailType) => void;
  setAdditionalInformation: (additionalInformation: AdditionalInformationType) => void;
  setReviewAndSubmit: (reviewAndSubmit: ReviewAndSubmitType) => void;

  // Reset all fields
  resetForm: () => void;
}

// Zustand store implementation
const useEventFormStore = create<EventManagementFormType>((set, get) => ({
  // Getters: Initialize default values
  personalInformation: { fullName: "", email: "", phone: "" },
  eventInformation: { eventType: "", eventDate: undefined, numberOfGuests: 0, budget: 0, eventDescription: "" },
  destinationDetails: { selectCountry: "", city: "", alternativeCity: "" },
  additionalInformation: { portFolio: "", specialRequirements: "" },
  reviewAndSubmit: { summary: "", consent: false },

  // Setters
  setPersonalInformation: (personalInfo) => set({ personalInformation: personalInfo }),
  setEventInformation: (eventInfo) => set({ eventInformation: eventInfo }),
  setDestinationDetails: (destinationDetails) => set({ destinationDetails }),
  setAdditionalInformation: (additionalInfo) => set({ additionalInformation: additionalInfo }),
  setReviewAndSubmit: (reviewSubmit) => set({ reviewAndSubmit: reviewSubmit }),

  // Reset all fields
  resetForm: () =>
    set({
      personalInformation: { fullName: "", email: "", phone: "" },
      eventInformation: { eventType: "", eventDate: undefined, numberOfGuests: 0, budget: 0, eventDescription: "" },
      destinationDetails: { selectCountry: "", city: "", alternativeCity: "" },
      additionalInformation: { portFolio: "", specialRequirements: "" },
      reviewAndSubmit: { summary: "", consent: false },
    }),
}));

export default useEventFormStore;
