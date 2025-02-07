"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DestinationDetailSchema } from "@/schemas/BookEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StepDescription from "@/components/event-arrangment/bookevent/StepDescription";
import EventComboxBox from "@/components/event-arrangment/bookevent/EventComboBox";
import {
  AzerbaijanCities,
  Countries,
  DubaiCities,
  PakistanCities,
  ThailandCities,
  TurkeyCities,
} from "./Data";
import BackButton from "@/components/event-arrangment/bookevent/BackButton";
import SubmitButton from "@/components/event-arrangment/bookevent/SubmitButton";
import useEventArrangementStore from "@/zustand/EventArrangementStore";
import type { DestinationDetailType } from "@/schemas/BookEvent";

function Destination() {
  // loading state for submit button
  const [loading, setLoading] = useState(false);

  // Zustand store
  const { destinationDetails, setDestinationDetails } =
    useEventArrangementStore();

  const router = useRouter();

  // Initialize the form with the validation schema
  const DestinationForm = useForm<DestinationDetailType>({
    mode: "onBlur",
    resolver: zodResolver(DestinationDetailSchema),
    defaultValues: { ...destinationDetails },
  });

  // Handle form submission
  const onSubmit = (submittedData: DestinationDetailType) => {
    setLoading(true);
    console.log("Form submitted with data for step 3", submittedData);
    setDestinationDetails({ ...destinationDetails, ...submittedData });
    router.push("/book-event/step4");
  };

  // Dynamically select cities based on the selected country
  const selectedCountry = DestinationForm.watch("selectCountry");
  const cityToRenderOnTheBaseOfCountry = (() => {
    switch (selectedCountry) {
      case "pakistan":
        return PakistanCities;

      case "dubai":
        return DubaiCities;

      case "turkey":
        return TurkeyCities;

      case "azerbaijan":
        return AzerbaijanCities;

      case "thailand":
        return ThailandCities;

      default:
        return [];
    }
  })();

  return (
    <Form {...DestinationForm}>
      <form
        className="flex flex-col w-full justify-between"
        onSubmit={DestinationForm.handleSubmit(onSubmit)}
      >
        {/* Step Description */}
        <StepDescription
          heading="Destination Information"
          description="Please provide your event destination details."
          className="mb-7"
        />

        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Select Country */}
          <FormField
            control={DestinationForm.control}
            name="selectCountry"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Country
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <FormControl>
                  <EventComboxBox
                    data={Countries}
                    defaultText="Select country"
                    value={field.value}
                    setValue={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Select the country where you want to host your event.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Render city selection based on the selected country */}
          {selectedCountry && (
            <>
              <FormField
                control={DestinationForm.control}
                name="city"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="flex text-primary justify-between">
                      City
                      <FormMessage className="text-destructive">
                        {error?.message}
                      </FormMessage>
                    </FormLabel>
                    <FormControl>
                      <EventComboxBox
                        data={cityToRenderOnTheBaseOfCountry}
                        defaultText="Select city"
                        value={field.value}
                        setValue={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Select the city in {selectedCountry.toUpperCase()} where
                      you would like to host your event.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={DestinationForm.control}
                name="alternativeCity"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="flex text-primary justify-between">
                      Alternative City
                      <FormMessage className="text-destructive">
                        {error?.message}
                      </FormMessage>
                    </FormLabel>
                    <FormControl>
                      <EventComboxBox
                        data={cityToRenderOnTheBaseOfCountry}
                        defaultText="Select city"
                        value={field.value}
                        setValue={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      If you have an alternative city in{" "}
                      {selectedCountry.toUpperCase()}, select it here.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Submit and Back Buttons */}
        <div className="flex justify-between">
          <BackButton />
          <SubmitButton text="Next" loading={loading}/>
        </div>
      </form>
    </Form>
  );
}

export default Destination;
