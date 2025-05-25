import { UserProfile } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Profile | AICSE",
    description:
      "Manage your AICSE profile, update account details, and personalize your user experience.",
    openGraph: {
      title: "Profile | AICSE",
      description:
        "Manage your AICSE profile, update account details, and personalize your user experience.",
      images: ["/profile-preview.png"], // Optional: update this to an actual profile-related image
    },
    twitter: {
      card: "summary_large_image",
      title: "Profile | AICSE",
      description:
        "Manage your AICSE profile, update account details, and personalize your user experience.",
      images: ["/profile-preview.png"], // Optional: update this to an actual profile-related image
    },
  };
};

function Page() {
  return (
    <section className="flex min-h-screen justify-center p-10 bg-background">
      <UserProfile
        appearance={{
          elements: {
            cardBox: "bg-card",
            // navbar

            scrollBox:
              "bg-card overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
            // page
            // pageScrollBox: "",
            page: "text-primary",
            headerTitle: "text-primary text-xl font-semibold",

            // upload button
            avatarImageActionsUpload: "bg-card text-primary hover:bg-secondary",
            avatarImageActionsRemove:
              "bg-destructive text-white hover:bg-red-800 hover:text-white",

            // profile sectio
            profileSection: "text-primary",
            profileSectionItemList__username: "border-2 border-red-500",
            userPreviewTextContainer: "text-muted-foreground",
            profileSectionPrimaryButton:
              "bg-muted text-primary px-4 py-2 rounded-full hover:bg-secondary hover:text-primary",
            profileSectionPrimaryButton__danger: "bg-destructive",

            // add email form
            actionCard: "bg-primary-foreground",
            formFieldLabelRow__emailAddress: "text-muted-foreground",

            // add and remove button
            formButtonPrimary: "bg-card px-5 py-2 text-primary hover:bg-muted",
            formButtonReset: "border-2 border-muted text-muted-foreground",

            // drop down menu connect account
            profileSection__connectedAccounts: "text-white",
            menuButton:
              "bg-muted hover:bg-secondary hover:text-primary text-primary rounded-full ",
            menuList: "flex flex-col bg-primary-foreground ",
            menuItem__connectedAccounts:
              "p-2 hover:bg-card text-primary hover:text-primary",
            formFieldRadioLabel: "text-muted-foreground",

            // badge of primary
            badge: "border border-muted bg-muted text-muted-foreground",

            footer: "bg-muted text-muted-foreground border-t border-border",
            formField:
              "border border-border rounded-md p-2 text-primary focus:ring focus:ring-primary focus:outline-none",
            formButton:
              "bg-primary text-card hover:bg-primary/90 rounded-md px-4 py-2",
          },
        }}
      />
    </section>
  );
}

export default Page;
