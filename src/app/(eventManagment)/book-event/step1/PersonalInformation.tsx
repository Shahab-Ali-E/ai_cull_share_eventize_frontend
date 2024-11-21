"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PersonalInformationSchema } from "@/schemas/BookEvent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import SubmitButton from "@/components/bookevent/SubmitButton";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import StepDescription from "@/components/bookevent/StepDescription";
import { useRouter } from "next/navigation";

function PersonalInformation() {
    const router = useRouter();
  // Define your form
  const personalInformationForm = useForm<z.infer<typeof PersonalInformationSchema>>({
    resolver: zodResolver(PersonalInformationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  // Define a submit handler.
  function onSubmit(data: z.infer<typeof PersonalInformationSchema>) {
    console.log("Form submitted with data:", data);
    router.push('/book-event/step2')
  }

  return (
    <Form {...personalInformationForm}>
      <form
        onSubmit={personalInformationForm.handleSubmit(onSubmit)}
        className="flex flex-col w-full justify-between"
      >
        {/* Description */}
        <StepDescription
          heading="Personal information"
          description="Please provide your name, email address, and phone number."
        />

        {/* Form Fields */}
        <div className="flex flex-col space-y-6">
          {/* Full name */}
          <FormField
            control={personalInformationForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. John Doe"
                    className="flex flex-grow border border-primary text-primary rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={personalInformationForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. JohnDoe@gmail.com"
                    className="w-full border border-primary text-primary rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={personalInformationForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="PK"
                    placeholder="e.g. 31232193120"
                    className="w-full text-primary border border-primary rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <SubmitButton text="Next Step" />
        </div>
      </form>
    </Form>
  );
}

export default PersonalInformation;
