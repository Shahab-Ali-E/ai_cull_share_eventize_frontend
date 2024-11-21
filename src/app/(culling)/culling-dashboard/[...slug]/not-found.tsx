import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <div className="max-w-md rounded-lg bg-card shadow-lg p-8 text-foreground border border-border">
        <h2 className="text-4xl font-bold text-headingtext mb-4">
          404 Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/culling-dashboard">
          <Label className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-accent hover:cursor-pointer hover:text-accent-foreground transition duration-200">
            Return Home
          </Label>
        </Link>
      </div>
    </div>
  );
}
