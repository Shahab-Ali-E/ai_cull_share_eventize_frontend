"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { EventDetailsSchema } from "@/schemas/BookEvent";
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
import StepDescription from "@/components/event-arrangment/bookevent/StepDescription";
import EventComboxBox from "@/components/event-arrangment/bookevent/EventComboBox";
import { EventTypes } from "./Data";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/event-arrangment/bookevent/BackButton";
import { useRouter } from "next/navigation";
import type { EventDetailsSchemaType } from "@/schemas/BookEvent";
import useEventArrangementStore from "@/zustand/EventArrangementStore";
import { cn } from "@/lib/utils";

function EventDetails() {
  // loading state for submit button
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Zustand store
  const { eventInformation, setEventInformation } = useEventArrangementStore();

  // Define your form
  const eventDetailForm = useForm<EventDetailsSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(EventDetailsSchema),
    defaultValues: { ...eventInformation },
  });

  // Define a submit handler
  function onSubmit(submittedData: EventDetailsSchemaType) {
    setLoading(true);
    setEventInformation({
      ...eventInformation,
      ...submittedData,
      eventDescription: submittedData.eventTypeDescription,
    });
    router.push("/book-event/step3");
  }

  const eventType = eventDetailForm.watch("eventType");

  return (
    <Form {...eventDetailForm}>
      <form
        onSubmit={eventDetailForm.handleSubmit(onSubmit)}
        className="flex flex-col w-full justify-between"
      >
        {/* Description */}
        <StepDescription
          heading="Event Information"
          description="Please provide your event details below."
          className="mb-12"
        />

        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Event Type */}
          <FormField
            control={eventDetailForm.control}
            name="eventType"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Event Type
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <FormControl>
                  <EventComboxBox
                    data={EventTypes}
                    defaultText="Select event type"
                    value={field.value}
                    setValue={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  Please select the type of event you are organizing, such as a
                  wedding, corporate gathering, or other specific events.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Event Type Description */}
          {eventType === "other" && (
            <FormField
              control={eventDetailForm.control}
              name="eventTypeDescription"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-primary justify-between">
                    Event Type Detail
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about the event you want"
                      className={cn(
                        "resize-none border text-primary rounded-sm",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide additional details about your event if the listed
                    types do not fully describe it.
                  </FormDescription>
                </FormItem>
              )}
            />
          )}

          {/* Event Date */}
          <FormField
            control={eventDetailForm.control}
            name="eventDate"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Event Date
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild disabled={loading}>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full border text-primary bg-muted rounded-sm flex justify-between items-center p-5",
                          error
                            ? "border-destructive"
                            : "border-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-muted-foreground">
                            Pick a date
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-primary-foreground">
                    <Calendar
                      mode="single"
                      initialFocus
                      disabled={(date) => {
                        const todayDate = new Date();

                        // selecting upcoming 10
                        const tenDayAhead = new Date();
                        tenDayAhead.setDate(todayDate.getDate() + 10);

                        // disable it for dates less then today date and upcoming 10 days
                        return date < todayDate || date < tenDayAhead;
                      }}
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the date on which the event will take place. Ensure the
                  date aligns with your availability and planning schedule.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Number of Guests */}
          <FormField
            control={eventDetailForm.control}
            name="numberOfGuests" // Make sure this matches the Zustand property
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Number of Guests
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={20}
                    max={4000}
                    placeholder="e.g., 20 - 4000"
                    className={cn(
                      "flex-grow border text-primary rounded-sm",
                      error ? "border-destructive" : "border-muted-foreground"
                    )}
                    disabled={loading}
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value || "20"))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Enter the estimated number of attendees for your event. This
                  helps in better planning and resource allocation.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Budget */}
          <FormField
            control={eventDetailForm.control}
            name="budget"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className="flex text-primary justify-between">
                  Budget
                  <FormMessage className="text-destructive">
                    {error?.message}
                  </FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    min={10000}
                    type="number"
                    placeholder="e.g., 100000"
                    className={cn(
                      "flex-grow border text-primary rounded-sm",
                      error ? "border-destructive" : "border-muted-foreground"
                    )}
                    disabled={loading}
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value || "10000"))
                    }
                  />
                </FormControl>
                <FormDescription>
                  Specify your estimated budget for the event. This helps in
                  tailoring services to your financial plan.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        {/* Submit and Back Buttons */}
        <div className="flex justify-between">
          <BackButton disabled={loading} />
          <SubmitButton text="Next" loading={loading} />
        </div>
      </form>
    </Form>
  );
}

export default EventDetails;
