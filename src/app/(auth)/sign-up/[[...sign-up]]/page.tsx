import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { Metadata } from 'next';
import React from 'react';

// Dynamically generate meta tags
export const generateMetadata = (): Metadata => {
  return {
    title: "Sign Up | SnapCull AI",
    description: "Create an account on SnapCull AI and start managing your images effortlessly.",
    openGraph: {
      title: "Sign Up | SnapCull AI",
      description: "Create an account on SnapCull AI and start managing your images effortlessly.",
      images: "/illustration.png",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign Up | SnapCull AI",
      description: "Create an account on SnapCull AI and start managing your images effortlessly.",
      images: "/illustration.png",
    },
  };
};

function Page() {
  return (
    <section className="flex flex-1 w-full h-full min-h-svh">
      <div className="grid w-full h-full min-h-svh grid-cols-1 md:grid-cols-12 shadow-lg rounded-lg">
        {/* Left Section - Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center col-span-8">
          <Image src="/illustration.png" alt="Illustration" width={400} height={400} />
        </div>

        {/* Right Section - Clerk SignUp */}
        <div className="flex flex-col h-full items-center justify-center p-6 bg-card col-span-4 ">
          <SignUp 
            appearance={{
              elements: {
                form:"space-y-1",
                card: "bg-transparent shadow-none border-none",
                headerTitle: "text-primary text-xl font-semibold",
                headerSubtitle: "text-muted-foreground",
                socialButtonsIconButton: "bg-muted hover:bg-primary-foreground",
                dividerText: "text-muted-foreground",
                dividerLine: "bg-muted-foreground",
                formFieldInput:"py-5 placeholder:text-muted-foreground",
                formFieldInputShowPasswordButton: "text-primary hover:text-secondary-foreground",
                otpCodeFieldInput: "bg-secondary text-primary",
                formResendCodeLink: "text-muted-foreground",
                identityPreviewEditButton: "text-muted-foreground",
                footerActionLink: "text-primary underline hover:text-muted-foreground",
                formButtonPrimary: "bg-primary-foreground rounded-[4px] text-white hover:bg-muted py-3",
                footer: "bg-transparent"
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
