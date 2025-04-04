"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AdditionalInformationSchema, AdditionalInformationType } from "@/schemas/BookEvent";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PortFolio from "@/components/event-arrangment/bookevent/PortFolio";
import StepDescription from "@/components/event-arrangment/bookevent/StepDescription";
import BackButton from "@/components/event-arrangment/bookevent/BackButton";
import SubmitButton from "@/components/event-arrangment/bookevent/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import useEventArrangementStore from "@/zustand/EventArrangementStore";
import { cn } from "@/lib/utils";

import { BirthdayPortfolios, WeddingPortfolios, CorporatePortfolios } from "./Data";

function AdditionalInformation() {
  // loading state for submit button
  const [loading,setLoading] = useState(false);

  // Zustand store
  const { additionalInformation, setAdditionalInformation, eventInformation } = useEventArrangementStore();
  const router = useRouter();
  console.log("event information ",eventInformation)

  // Define the form
  const AdditionalInformationForm = useForm<AdditionalInformationType>({
    mode: "onBlur",
    resolver: zodResolver(AdditionalInformationSchema),
    defaultValues: { ...additionalInformation },
  });

  // Handle form submission
  const onSubmit = (submittedData: AdditionalInformationType) => {
    setLoading(true);
    setAdditionalInformation({ ...additionalInformation, ...submittedData });
    router.push("/book-event/step5");
  };

  const portfolioToRenderBaseOnEventType = (() => {
    switch (eventInformation.eventType) {
      case "birthday":
        return BirthdayPortfolios;

      case "wedding":
        return WeddingPortfolios;

      case "corporate":
        return CorporatePortfolios;

      case "other":
        return [];

      default:
        return [];
    }
  })();

  return (
    <Form {...AdditionalInformationForm}>
      <form
        className="flex flex-col w-full justify-between"
        onSubmit={AdditionalInformationForm.handleSubmit(onSubmit)}
      >
        {/* Step Description */}
        <StepDescription
          heading="Additional Information"
          description="Please provide additional details."
          className="mb-7"
        />

        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Portfolio Selection - Render only if eventType is not 'other' */}
          {eventInformation.eventType !== "other" && (
            <FormField
              control={AdditionalInformationForm.control}
              name="portFolio"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-primary justify-between">
                    Portfolio
                    <FormMessage className="text-destructive">{error?.message}</FormMessage>
                  </FormLabel>
                  <FormControl>
                    <PortFolio
                      buttonTitle="Select Portfolio"
                      heading="Select the portfolio you want"
                      imagesData={portfolioToRenderBaseOnEventType}
                      selectedPortfolio={field.value ?? null}
                      setSelectedPortfolio={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription>
                    Select the portfolio you want for your event.
                  </FormDescription>
                </FormItem>
              )}
            />
          )}

          {/* Additional Requirements */}
          <FormField
            control={AdditionalInformationForm.control}
            name="specialRequirements"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Additional Requirements
                  <FormMessage className="text-destructive">{error?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write any special requirement if you want"
                    className={cn(
                      "border h-40 resize-none text-primary rounded-sm",
                      error ? "border-destructive" : "border-muted-foreground"
                    )}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Write any special requirement if you want.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        {/* Submit and Back Buttons */}
        <div className="flex justify-between">
          <BackButton disabled={loading}/>
          <SubmitButton text="Next" loading={loading}/>
        </div>
      </form>
    </Form>
  );
}

export default AdditionalInformation;
