"use client"; // Required for interactivity (e.g., Framer Motion)

import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button is imported here
import { LottieComponent } from "./lazy-lottie-load";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface Custom404Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function Custom404({
  title = "Page not found",
  description = "We couldn't find the page you were looking for.",
  buttonText = "View Our Services",
  buttonHref = "/",
}: Custom404Props) {
  const Client = new QueryClient();
  const { theme } = useTheme();

  useEffect(()=>{},[theme])

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-around w-full bg-inherit pt-10 md:pt-24">
      {/* Text Content */}
      <div className="text-center md:text-left max-w-md md:max-w-full">
        <h1 className="text-4xl md:text-7xl text-primary mb-2 md:mb-4">
          {title}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          {description}
        </p>
        <Button asChild className="rounded-full p-4 md:p-6 text-xs md:text-sm">
          <Link href={buttonHref} className="font-medium">
            {buttonText}
          </Link>
        </Button>
      </div>

      {/* Lottie Animation */}
      <QueryClientProvider client={Client}>
        <div className="flex">
          {theme === "light" ? (
            <LottieComponent
              getAnimationData={() =>
                import(
                  "../images/animations/Animation-404-for-light-theme.json"
                )
              }
              id=""
              loop
              className="w-60 h-60 md:w-96 md:h-96"
            />
          ) : (
            <LottieComponent
            getAnimationData={() =>
              theme === "light"
                ? import("../images/animations/Animation-404-for-light-theme.json")
                : import("../images/animations/Animation-404-for-dark-theme.json")
            }
            id={theme || "light"}
            loop
            className="w-60 h-60 md:w-96 md:h-96"
          />
          )}
        </div>
      </QueryClientProvider>
    </section>
  );
}
