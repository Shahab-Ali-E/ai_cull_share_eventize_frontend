"use client";

import React from "react";
import { Label } from "../../ui/label";
import { usePathname } from "next/navigation";
import { IoIosCheckmark } from "react-icons/io";

const steps = [
  { route: "/book-event/step1", title: "Personal Information", step: 1 },
  { route: "/book-event/step2", title: "Event Details", step: 2 },
  { route: "/book-event/step3", title: "Select Destination", step: 3 },
  { route: "/book-event/step4", title: "Additional Information", step: 4 },
  { route: "/book-event/step5", title: "Review and Submit", step: 5 },
];

function EventFormSideBar() {
  const pathname = usePathname();

  // Find the index of the current step based on the pathname
  const currentStepIndex = steps.findIndex((step) => step.route === pathname);

  return (
    <aside className="relative flex w-full h-fit bg-primary-foreground shadow-none md:shadow-lg shadow-secondary rounded-2xl text-2xl overflow-hidden border-2 dark:border-none">
      {/*for all devices other then sm */}

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-row md:flex-col p-8 justify-between md:justify-normal space-y-0 md:space-y-5 w-full md:w-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            {index < currentStepIndex ? (
              // Passed step with tick
              <div className="rounded-full bg-headingtext h-9 w-9 flex items-center justify-center text-white text-base font-bold">
                <IoIosCheckmark className="text-white h-9 w-9" />
              </div>
            ) : pathname === step.route ? (
              // Current active step
              <div className="rounded-full bg-headingtext h-9 w-9 flex items-center justify-center text-white text-base font-bold">
                {step.step}
              </div>
            ) : (
              // Upcoming steps
              <div className="rounded-full bg-transparent border border-muted-foreground h-10 w-10 flex items-center justify-center text-muted-foreground text-xs font-bold">
                {step.step}
              </div>
            )}
            <div>
              <Label
                className={`hidden md:block ${
                  pathname === step.route
                    ? "text-lg font-bold text-primary"
                    : index < currentStepIndex
                    ? "text-sm font-semibold text-primary"
                    : "text-sm font-semibold text-muted-foreground"
                }`}
              >
                {step.title}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default EventFormSideBar;
