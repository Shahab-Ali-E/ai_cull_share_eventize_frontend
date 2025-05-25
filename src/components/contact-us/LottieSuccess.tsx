// components/contact-us/LottieSuccess.tsx
"use client";

import Lottie from "lottie-react";
import successAnimation from "@/images/animations/success_animation2.json";
import { Card, CardContent } from "@/components/ui/card";

export default function LottieSuccess() {
  return (
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
  );
}
