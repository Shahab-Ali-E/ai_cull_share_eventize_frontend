"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
//   reset,
}: {
  error: Error & { digest?: string };
//   reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("App Crashed:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="bg-background rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground">
          Sorry, the page crashed unexpectedly. You can refresh or go back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => location.reload()} variant="default">
            Refresh Page
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="secondary"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
