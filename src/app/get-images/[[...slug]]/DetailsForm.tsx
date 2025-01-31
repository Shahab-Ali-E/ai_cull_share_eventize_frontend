// 'use client';

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { PhoneInput } from "@/components/ui/phone-input";
// import { cn } from "@/lib/utils";
// import { DetailsFormSchema, DetailsFormType } from "@/schemas/GetImagesForm";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";

// function DetailsForm() {

//     const detailsForm = useForm<DetailsFormType>({
//         mode:'onBlur',
//         resolver: zodResolver(DetailsFormSchema),
//         defaultValues:{
//             firstName:"",
//             lastName:"",
//             email:"",
//             phone:"",
//         }
//     })

//     const onSubmit = (data:DetailsFormType)=>{
//         console.log("subbmitted data",data)
//     }

//   return (
//     <Form {...detailsForm}>
//       <form
//         onSubmit={detailsForm.handleSubmit(onSubmit)}
//         className="flex flex-col w-full justify-between space-y-7 bg-primary-foreground p-9 sm:p-12 rounded-md"
//       >
//         {/* Description */}
//         <div>
//             <Label className="text-lg md:text-xl font-semibold">Provide few of your details</Label>
//         </div>

//         {/* Form Fields */}
//         <div className="flex flex-col space-y-6 px-4 sm:px-5">
//           {/* First Name */}
//           <FormField
//             control={detailsForm.control}
//             name="firstName"
//             render={({ field, fieldState: { error } }) => (
//               <FormItem>
//                 <FormLabel className="flex text-primary justify-between text-sm md:text-sm">
//                   Full Name
//                   <FormMessage className="text-destructive text-xs md:text-sm">
//                     {error?.message}
//                   </FormMessage>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="e.g. John"
//                     className={cn(
//                       "flex flex-grow border text-primary rounded-sm",
//                       error ? "border-destructive" : "border-muted-foreground"
//                     )}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription className="text-xs md:text-sm">
//                   Provide your correct first name.
//                 </FormDescription>
//               </FormItem>
//             )}
//           />

//           {/* Last Name */}
//           <FormField
//             control={detailsForm.control}
//             name="lastName"
//             render={({ field, fieldState: { error } }) => (
//               <FormItem>
//                 <FormLabel className="flex text-primary justify-between">
//                   Last Name
//                   <FormMessage className="text-destructive text-xs md:text-sm">
//                     {error?.message}
//                   </FormMessage>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="e.g. Doe"
//                     className={cn(
//                       "flex flex-grow border text-primary rounded-sm",
//                       error ? "border-destructive" : "border-muted-foreground"
//                     )}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription className="text-xs md:text-sm">
//                   Provide your correct last name.
//                 </FormDescription>
//               </FormItem>
//             )}
//           />

//           {/* Email */}
//           <FormField
//             control={detailsForm.control}
//             name="email"
//             render={({ field, fieldState: { error } }) => (
//               <FormItem>
//                 <FormLabel className="flex text-primary justify-between">
//                   Email
//                   <FormMessage className="text-destructive text-xs md:text-sm">
//                     {error?.message}
//                   </FormMessage>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="e.g. JohnDoe@gmail.com"
//                     className={cn(
//                       "w-full border text-primary rounded-sm",
//                       error ? "border-destructive" : "border-muted-foreground"
//                     )}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription className="text-xs md:text-sm">
//                   Enter a valid email address.
//                 </FormDescription>
//               </FormItem>
//             )}
//           />

//           {/* Phone */}
//           <FormField
//             control={detailsForm.control}
//             name="phone"
//             render={({ field, fieldState: { error } }) => (
//               <FormItem>
//                 <FormLabel className="flex text-primary justify-between">
//                   Phone
//                   <FormMessage className="text-destructive text-xs md:text-sm">
//                     {error?.message}
//                   </FormMessage>
//                 </FormLabel>
//                 <FormControl>
//                   <PhoneInput
//                     defaultCountry="PK"
//                     placeholder="e.g. 31232193120"
//                     className={cn(
//                       "w-full text-primary border rounded-sm",
//                       error ? "border-destructive" : "border-muted-foreground"
//                     )}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormDescription className="text-xs md:text-sm">
//                   Provide an active phone number where we can reach you if
//                   needed.
//                 </FormDescription>
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <Button type="submit" className="rounded text-white bg-gradient-to-r from-purple-600 to-teal-400 ">Find my images</Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// export default DetailsForm;


"use client";

import { Button } from "@/components/ui/button";
import { AssociateUserWithEvent } from "@/lib/actions/SmartShare/AssociateUserWithEvent"; // Adjust the import path
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function FindMyImagesButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const result = await AssociateUserWithEvent({ eventId });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    }
    if(result.data == "success"){
      router.push(`/get-images/${eventId}/face-recognition`)
    }
  };

  return (
    <Button
      className="bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-4 py-2 rounded-sm shadow-lg flex items-center gap-2"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner size="small" show/>
          Finding...
        </>
      ) : (
        "Find My Images"
      )}
    </Button>
  );
}

