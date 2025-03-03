import { Suspense } from "react";

// components
import Await from "./Await";
import Loading from "./loading";
import ShareEventPage from "./ShareEventPage";

// // apis
import { GetEventById } from "@/lib/actions/SmartShare/GetEvents";
import { getClerkToken } from "@/lib/actions/clerk-token";


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
