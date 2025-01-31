// --------------- multi step book form types --------------
// Export Interfaces
export interface PersonalInformationType {
  fullName: string;
  email: string;
  phone: string;
}

export interface EventInformationType {
  eventType: string;
  eventDescription?: string | undefined;
  eventDate: Date | undefined;
  numberOfGuests: number;
  budget: number;
}

export interface DestinationDetailType {
  selectCountry: string;
  city: string;
  alternativeCity: string;
}

export interface AdditionalInformationType {
  portFolio: string;
  specialRequirements?: string | undefined;
}

export interface SubmitFormType
  extends PersonalInformationType,
    EventInformationType,
    DestinationDetailType,
    AdditionalInformationType {
  userId?: string | null;
}

// Main interface for Zustand store
export interface EventArrangementType {
  // Getters
  toggleView: boolean;

  // ---- event arrangment book form states
  personalInformation: PersonalInformationType;
  eventInformation: EventInformationType;
  destinationDetails: DestinationDetailType;
  additionalInformation: AdditionalInformationType;
  loading: boolean;

  // Setters
  setToggleView: (toggleView: boolean) => void;
  // ---- event arrangment book form states
  setPersonalInformation: (
    personalInformation: PersonalInformationType
  ) => void;
  setEventInformation: (eventInformation: EventInformationType) => void;
  setDestinationDetails: (destinationDetails: DestinationDetailType) => void;
  setAdditionalInformation: (
    additionalInformation: AdditionalInformationType
  ) => void;
  setLoading: (loading: boolean) => void;

  // Reset all fields
  resetForm: () => void;
}
