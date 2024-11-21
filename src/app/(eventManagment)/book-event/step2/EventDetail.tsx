"use client";

import React from "react";
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
import * as z from "zod";
import SubmitButton from "@/components/bookevent/SubmitButton";
import StepDescription from "@/components/bookevent/StepDescription";
import EventComboxBox from "@/components/bookevent/EventComboBox";
import { EventTypes } from "./Data";
import { Textarea } from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import BackButton from "@/components/bookevent/BackButton";
import { useRouter } from "next/navigation";

function EventDetails() {
  const router = useRouter();
  // Define your form
  const EventDetailForm = useForm<z.infer<typeof EventDetailsSchema>>({
    resolver: zodResolver(EventDetailsSchema),
    defaultValues: {
      budget:0,
      eventType:'',
      numberOfGuests:0,
      specifyEventType:'',
      eventDate:undefined,
      eventTypeDescription:'',
    },
  });

  // Watch the eventType field
  const eventType = EventDetailForm.watch("eventType");

  // Define a submit handler.
  function onSubmit(data: z.infer<typeof EventDetailsSchema>) {
    console.log("Form submitted with data of step 2", data);
    router.push('/book-event/step3')
  }

  return (
    <Form {...EventDetailForm}>
      <form
        className="flex flex-col w-full space-y-14"
        onSubmit={EventDetailForm.handleSubmit(onSubmit)}
      >
        {/* Description */}
        <StepDescription
          heading="Event Information"
          description="Please provide your name, email address, and phone number."
        />

        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Event Type */}
          <FormField
            control={EventDetailForm.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Event Type</FormLabel>
                <FormControl>
                  <EventComboxBox
                    data={EventTypes}
                    defaultText="Select event type"
                    value={field.value}
                    setValue={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* event description */}
          {
            eventType === 'other' ?
            (
              <FormField
                control={EventDetailForm.control}
                name="eventTypeDescription"
                render={({ field }) => (
                  <FormItem className="ease-in-out transition-all duration-300">
                    <FormLabel className="text-primary">Event type detail</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us a bit about event you want"
                          className="border border-muted-foreground resize-none text-primary"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
            :
            null
          }

          {/* event date */}
          <FormField
            control={EventDetailForm.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-primary">Event date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`
                          w-full border border-muted-foreground bg-primary-foreground text-primary p-5 rounded-sm text-left font-normal
                          ${!field.value && "text-muted-foreground"}
                        `}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-primary-foreground" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  select event date on which date you want to occur your event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Guests */}
          <FormField
            control={EventDetailForm.control}
            name="numberOfGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Number of Guests</FormLabel>
                <FormControl>
                 <Input
                    type="number"
                    min={20}
                    max={4000}
                    placeholder="e.g. 20 - 4000"
                    className="flex flex-grow border border-primary text-primary rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  estimated number of guests in your event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget */}
          <FormField
            control={EventDetailForm.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Budget</FormLabel>
                  <FormControl>
                  <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 100000"
                      className="flex flex-grow border border-primary text-primary rounded-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    enter the estimated budget of your event
                  </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-between">
          <BackButton />
          <SubmitButton text="Next Step" />
        </div>
      </form>
    </Form>
  );
}

export default EventDetails;
