import { Suspense } from "react";

// components
import Await from "./Await";
import Loading from "./loading";
import ShareEventPage from "./ShareEventPage";

// // apis
import { GetEventById } from "@/lib/actions/SmartShare/GetEvents";
import { getClerkToken } from "@/lib/actions/clerk-token";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { ShareEvent: string };
}): Promise<Metadata> {
  // Fetch dynamic data based on route parameter (e.g., event id)
  const eventId = params.ShareEvent;
  // Get token once outside the cached function
  const token = await getClerkToken();
  const eventData = await GetEventById({ eventId }, token);

  if (!eventData.data) {
    // Return fallback metadata if event data is not available
    return {
      title: "Event Not Found",
      description: "The event you are looking for does not exist.",
      keywords: ["event", "not found"],
    };
  }

  return {
    title: `Smart share dashboard | ${eventData.data.name}`,
    description:
      "Create, manage, and organize your events. View event details, sort, paginate, and delete event to maintain an efficient photo sharing process.",
    keywords: [
      "smart share",
      "events workspace management",
      "create event workspaces",
      "sort event workspaces",
      "paginate events",
      "delete event",
      "AI image sharing",
      "face recognition",
      "share images",
      "images embedding",
      "get images by face recognition",
      "share images with your friends and colleagues",
      "share event",
    ],
  };
}



const Page = async ({ params }: { params: { ShareEvent: string } }) => {
  const eventId = params.ShareEvent;
  // Get token once outside the cached function
  const token = await getClerkToken();
  const eventDataPromise = GetEventById({ eventId }, token);

  return (
    <Suspense fallback={<Loading />}>
      <Await promise={eventDataPromise}>
        {({ data, error }) => (
          
          <ShareEventPage eventData={data} error={error} />
        )}
      </Await>
    </Suspense>
  );
};

export default Page;
