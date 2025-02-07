"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import { ContactUsFormSchema, ContactUsFormType } from "@/schemas/ContactUs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { contactUs } from "@/lib/actions/Dashboard/ContactUs";
import { toast } from "sonner";
import Lottie from "lottie-react";
import successAnimation from "@/images/animations/success_animation2.json";
import { Card, CardContent } from "@/components/ui/card";

function PersonalInformation() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission


  const contactUsForm = useForm<ContactUsFormType>({
    mode: "onBlur",
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: { 
        description:"",
        email:"",
        firstName:"",
        lastName:"",
        phone:"", 
    },
  });

  async function onSubmit(submittedData: ContactUsFormType) {
    setLoading(true);
    
    try {
      const response = await contactUs({ contactUsData: submittedData });

      if (response?.error) {
        toast.error("Error Submitting Form", {
          description: response.error,
        });
      } else if (response?.success) {
        setIsSubmitted(true); // Set form as submitted
      }
    } catch (error) {
      console.error("Error Submitting Form", error);
      toast.error("Error Submitting Form", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...contactUsForm}>
      {isSubmitted ? (
        // Success Animation
        <Card className="bg-card dark:bg-primary-foreground p-16 md:p-24">
          <CardContent className="flex flex-col items-center text-center justify-center space-y-5">
            <Lottie
              animationData={successAnimation}
              loop={false}
              className="h-40 w-40 md:h-48 md:w-48"
            />
            <div className="flex flex-col space-y-1 ">
              <p className="text-base font-semibold text-primary">
                Thank you for contacting us!
              </p>
              <p className="text-sm text-muted-foreground">
                We have received your message and will get back to you shortly.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Form
        <form
          onSubmit={contactUsForm.handleSubmit(onSubmit)}
          className="flex flex-col space-y-7 md:space-y-10 w-full justify-between bg-card dark:bg-primary-foreground shadow-md px-10 md:px-16 py-7 md:py-10 rounded-sm"
        >
          {/* Description */}
          <div className="flex flex-col max-w-lg">
            <h2 className="text-lg md:text-2xl font-semibold text-primary mb-2">
              Contact Us
            </h2>
            <p className="text-sm text-muted-foreground">
              Have questions or need assistance? Reach out to our team,
              we&rsquo;re here to help.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col space-y-6">
            {/* First Name */}
            <FormField
              control={contactUsForm.control}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-primary justify-between">
                    First Name
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. John"
                      className={cn(
                        "flex flex-grow border text-primary rounded-sm",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={contactUsForm.control}
              name="lastName"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-primary justify-between">
                    Last Name
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Doe"
                      className={cn(
                        "flex flex-grow border text-primary rounded-sm",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={contactUsForm.control}
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
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={contactUsForm.control}
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
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={contactUsForm.control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-primary justify-between">
                    Description
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave us a message..."
                      className={cn(
                        "border text-primary rounded-sm",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end w-full">
            <Button
              type="submit"
              className={`w-full rounded-sm py-3 ${
                loading && "opacity-80 hover:bg-primary cursor-not-allowed"
              }`}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <Spinner size="small" className="text-primary-foreground" />
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
}

export default PersonalInformation;
