import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/components/logo";

// Dynamically generate meta tags
export const generateMetadata = (): Metadata => {
  return {
    title: "Sign In | SnapCull AI",
    description:
      "Sign in to your SnapCull AI account and start managing your images with a seamless experience.",
    openGraph: {
      title: "Sign In | SnapCull AI",
      description:
        "Sign in to your SnapCull AI account and start managing your images with a seamless experience.",
      images: "/illustration.png",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign In | SnapCull AI",
      description:
        "Sign in to your SnapCull AI account and start managing your images with a seamless experience.",
      images: "/illustration.png",
    },
  };
};

function Page() {
  return (
    <section className="relative flex flex-1 w-full h-full min-h-svh">
      <div className="grid w-full h-full min-h-svh grid-cols-1 md:grid-cols-12 shadow-lg rounded-lg">
        {/* Left Section - Illustration */}
        <div className="hidden md:flex flex-col p-7 col-span-8">
          <Logo />
        </div>

        {/* Right Section - Clerk SignIn */}
        <div className="flex flex-col h-full items-center justify-center p-6 bg-card col-span-4 ">
          <SignIn
            appearance={{
              elements: {
                cardBox: "shadow-none border-none",
                card: "bg-transparent border-none",
                headerTitle: "text-primary text-xl font-semibold",
                headerSubtitle: "text-muted-foreground",
                socialButtonsIconButton: "bg-muted hover:bg-primary-foreground",
                dividerText: "text-muted-foreground",
                dividerLine: "bg-muted-foreground",
                formFieldInputShowPasswordButton:
                  "text-primary hover:text-secondary-foreground",
                formFieldInput: "py-5",
                footerActionLink:
                  "text-primary underline hover:text-muted-foreground",
                backLink: "text-muted-foreground",
                otpCodeFieldInput: "bg-secondary text-primary",
                formResendCodeLink: "text-muted-foreground",
                alternativeMethodsBlockButton:
                  "bg-secondary text-primary hover:bg-secondary",
                formFieldAction__password:
                  "text-muted-foreground hover:text-muted-foreground",
                formButtonPrimary:
                  "bg-primary-foreground rounded-[4px] text-white hover:bg-muted py-2 text-primary",
                buttonArrowIcon: "text-primary",
                footerActionText: "text-primary",
                footer: "bg-transparent border-none",
                footerAction: "bg-transparent border-none",
              },
            }}
          />
        </div>
      </div>
      <div className="inline-block absolute top-5 right-5">
        <ThemeToggle />
      </div>
    </section>
  );
}

export default Page;
