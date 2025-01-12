"use client";

import { LottieComponent } from "@/components/lazy-lottie-load";
import CreateEvent from "@/components/SmartShare/CreateEvent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

function GetStarted() {
  const client = new QueryClient();

  return (
      <QueryClientProvider client={client}>
        <div className="flex flex-col items-center space-y-7">
          <LottieComponent
            getAnimationData={() =>
              import("../../../images/animated-icons/Rocket-launch.json")
            }
            id="empty-box"
            loop
            className="h-56 w-56"
          />
          <div className="flex flex-col text-center space-y-4">
            <div className="text-4xl font-bold text-primary">Get Started!</div>
            <div className="text-base font-semibold text-primary">
              <p>✨ Share your images effortlessly!</p>
              <p>
                Create an event, upload your images, and share them with anyone
                using a QR code.
              </p>
            </div>
          </div>
          <div>
            <CreateEvent />
          </div>
        </div>
      </QueryClientProvider>
  );
}

export default GetStarted;
