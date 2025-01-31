"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PersonalInformationSchema } from "@/schemas/BookEvent";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/event-arrangment/bookevent/SubmitButton";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import StepDescription from "@/components/event-arrangment/bookevent/StepDescription";
import { useRouter } from "next/navigation";
import type { PersonalInformationType } from "@/schemas/BookEvent";
import useEventArrangementStore from "@/zustand/EventArrangementStore";
import { cn } from "@/lib/utils";

function PersonalInformation() {
  const router = useRouter();

  // Using event form Zustand store
  const { personalInformation, setPersonalInformation } = useEventArrangementStore();

  // Define your form
  const personalInformationForm = useForm<PersonalInformationType>({
    mode: "onBlur",
    resolver: zodResolver(PersonalInformationSchema),
    defaultValues: { ...personalInformation },
  });

  // Define a submit handler
  function onSubmit(submittedData: PersonalInformationType) {
    setPersonalInformation({ ...personalInformation, ...submittedData });
    router.push("/book-event/step2");
  }

  return (
    <Form {...personalInformationForm}>
      <form
        onSubmit={personalInformationForm.handleSubmit(onSubmit)}
        className="flex flex-col w-full justify-between"
      >
        {/* Description */}
        <StepDescription
          heading="Personal Information"
          description="Please provide accurate personal details to help us coordinate effectively."
          className="mb-11"
        />

        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Full Name */}
          <FormField
            control={personalInformationForm.control}
            name="fullName"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Full Name
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. John Doe"
                    className={cn(
                      "flex flex-grow border text-primary rounded-sm",
                      error ? "border-destructive" : "border-muted-foreground"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide your complete name as it appears on official documents.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={personalInformationForm.control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Email
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. JohnDoe@gmail.com"
                    className={cn(
                      "w-full border text-primary rounded-sm",
                      error ? "border-destructive" : "border-muted-foreground"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a valid email address for event-related updates and communication.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={personalInformationForm.control}
            name="phone"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Phone
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="PK"
                    placeholder="e.g. 31232193120"
                    className={cn(
                      "w-full text-primary border rounded-sm",
                      error ? "border-destructive" : "border-muted-foreground"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide an active phone number where we can reach you if needed.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <SubmitButton text="Next" />
        </div>
      </form>
    </Form>
  );
}

export default PersonalInformation;
