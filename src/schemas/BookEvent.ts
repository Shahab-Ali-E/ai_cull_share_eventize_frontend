import { z } from "zod";

// Step 1 schema for user information
export const PersonalInformationSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(50, { message: "Email must not exceed 50 characters" }),
  phone: z
    .string()
    .min(13, { message: "Phone number must be at least 10 digits" })
    .max(14, { message: "Phone number must not exceed 14 digits" })
});
// type of personal information schema
export type PersonalInformationType  = z.infer<typeof PersonalInformationSchema>

// Step 2 schema for event details
export const EventDetailsSchema = z.object({
  eventType: z
    .string()
    .min(3, { message: "Event type must be selected" }),
  eventTypeDescription: z
    .string()
    .min(5,{ message: "Event type must be at least 5 characters long" })
    .max(100,{ message: "Event type must not exceed 100 characters" })
    .optional(),
  eventDate: z
    .preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date())
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
  }),
  numberOfGuests: z
    .number()
    .min(10, { message: "Guests must be at least 10" })
    .max(4000, { message: "Guests must not exceed 4000" }),
  budget: z
    .number()
    .min(10000, { message: "Budget must be at least 10k" })
    .max(100000000, { message: "Budget must not exceed 100M" }),
});
// type of Event Details schema
export type EventDetailsSchemaType  = z.infer<typeof EventDetailsSchema>

// Step 3 schema for destination
export const DestinationDetailSchema = z.object({
  selectCountry: z
    .string()
    .min(2, { message: "Country must be selected" })
    .max(100, { message: "Country must not exceed 100 characters" }),
  city: z
    .string()
    .min(3, { message: "city must be selected" })
    .max(100, { message: "Preferred destination must not exceed 100 characters" }),
  alternativeCity: z
    .string()
    .optional(),
});
// type of Destination Detail schema
export type DestinationDetailType  = z.infer<typeof DestinationDetailSchema>


// Step 4: Additional Information
export const AdditionalInformationSchema = z.object({
  portFolio: z.
  string({message:"portFolio must be selected"}).max(50,{message:"portFolio must be selected"}).optional(),
  specialRequirements: z
  .string()
  .max(500, { message: "Special requirements must not exceed 500 characters" })
  .optional(),
});
// type of Additional Information schema
export type AdditionalInformationType  = z.infer<typeof AdditionalInformationSchema>

// Step 5: Review and Submit
export const ReviewAndSubmitSchema = z.object({
  ...PersonalInformationSchema.shape,
  ...EventDetailsSchema.shape,
  ...DestinationDetailSchema.shape,
  ...AdditionalInformationSchema.shape
});
// type of Review And Submit schema
export type ReviewAndSubmitSchemaType  = z.infer<typeof ReviewAndSubmitSchema>
