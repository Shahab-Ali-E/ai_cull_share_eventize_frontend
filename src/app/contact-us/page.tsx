import React from "react";
import ContactForm from "./ContactForm";
import { Label } from "@/components/ui/label";
import RightSideContact from "@/components/contact-us/RightSideContact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us for any inquiries, support, or collaboration opportunities. We're here to help!",
};

function Page() {
  return (
    <section className="flex flex-col space-y-10 px-7 md:px-0">
      {/* contact our team description */}
      <section className="flex flex-col space-y-4 w-full text-center">
        <Label className="text-2xl md:text-4xl font-bold text-primary">
          Contact our team
        </Label>
        <Label className="text-sm md:text-base flex flex-col text-muted-foreground">
          Got any questions about the product or scaling on our platform? Were
          here to help.
          <Label className="text-sm md:text-base text-muted-foreground mt ">
            Chat to our friendly team 24/7 and get onboard in less then 5
            minutes.
          </Label>
        </Label>
      </section>
      <section className="flex flex-col md:flex-row w-full md:w-4/5 self-center justify-center space-x-0 md:space-x-10 space-y-6 md:space-y-0">
        {/* contact form */}
        <div className=" w-full md:w-2/3">
          <ContactForm />
        </div>

        {/* Right Side Info Section */}
        <div>
          <RightSideContact />
        </div>
      </section>
    </section>
  );
}

export default Page;
