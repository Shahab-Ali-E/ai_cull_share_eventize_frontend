"use client";

import { LottieComponent } from "@/components/lazy-lottie-load";
import CreateEvent from "@/components/SmartShare/CreateEvent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function GetStarted() {
  const client = new QueryClient();

  return (
      <QueryClientProvider client={client}>
        <div className="flex flex-col items-center space-y-4">
          <LottieComponent
            getAnimationData={() =>
              import("../../../../images/animations/smart-share-not-event-found.json")
            }
            id="empty-box"
            loop
            className="h-52 w-52"
          />
          <div className="flex flex-col text-center items-center space-y-2">
            <div className="text-lg sm:text-xl font-bold text-primary">Get Started!</div>
            <div className="text-xs sm:text-sm font-medium text-primary w-2/3 md:w-full">
              <p>✨ Share your images effortlessly!</p>
              <p>
                Create an event, upload your images, and share them with anyone
                using a QR code
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <CreateEvent />
          </div>
        </div>
      </QueryClientProvider>
  );
}

export default GetStarted;
