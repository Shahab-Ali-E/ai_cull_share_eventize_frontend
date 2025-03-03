"use client";

import { Button } from "@/components/ui/button";
import { AssociateUserWithEvent } from "@/lib/actions/SmartShare/AssociateUserWithEvent"; // Adjust the import path
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function FindMyImagesButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const result = await AssociateUserWithEvent({ eventId });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    }
    if(result.data == "success"){
      router.replace(`/get-images/${eventId}/face-recognition`)
    }
  };

  return (
    <Button
      className="bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-4 py-2 rounded-sm shadow-lg flex items-center gap-2"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner size="small" show/>
          Finding...
        </>
      ) : (
        "Find My Images"
      )}
    </Button>
  );
}

