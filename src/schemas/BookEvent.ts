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
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(14, { message: "Phone number must not exceed 14 digits" })
});

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
    .date({required_error: "event date is required.",}),
  numberOfGuests: z
    .number()
    .min(10, { message: "Guests must be at least 10" })
    .max(4000, { message: "Guests must not exceed 4000" }),
  budget: z
    .number()
    .min(5, { message: "Budget must be at least 10k" })
    .max(50, { message: "Budget must not exceed 50M" }),
  specifyEventType: z
    .string()
    .max(200, { message: "Specify event type must not exceed 200 characters" })
    .optional(),
});

// Step 3 schema for destination
export const DestinationDetailSchema = z.object({
  selectCountry: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long" })
    .max(100, { message: "Country must not exceed 100 characters" }),
  preferredDestination: z
    .string()
    .min(3, { message: "Preferred destination must be at least 3 characters long" })
    .max(100, { message: "Preferred destination must not exceed 100 characters" }),
  alternativePreferredDestination: z
    .string()
    .min(3, { message: "Alternative preferred destination must be at least 3 characters long" })
    .max(100, { message: "Alternative preferred destination must not exceed 100 characters" }),
});

// Step 4: Additional Information
export const AdditionalInformationSchema = z.object({
  specialRequirements: z
    .string()
    .max(500, { message: "Special requirements must not exceed 500 characters" })
    .optional(),
  uploadFiles: z
    .array(
      z.object({
        name: z.string(), // File name
        size: z.number().max(5 * 1024 * 1024, { message: "File size must not exceed 5MB" }),
        type: z.enum(["image/png", "image/jpeg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"], {
          message: "File must be an image, PDF, or Word document",
        }),
      })
    )
    .optional(),
});

// Step 5: Review and Submit
export const ReviewAndSubmitSchema = z.object({
  summary: z
    .string()
    .min(20,{ message: "Summary cannot be empty" }),
  consent: z
    .boolean()
    .refine((value) => value === true, { message: "You must confirm that the information is accurate" }), 
});
