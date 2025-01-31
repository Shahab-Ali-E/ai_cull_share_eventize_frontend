import { Suspense } from "react";

// components
import Await from "./Await";
import Loading from "./loading";
import ShareEventPage from "./ShareEventPage";

// // apis
import { GetEventById } from "@/lib/actions/SmartShare/GetEvents";


const WorkspaceMain = ({ params }: { params: {ShareEvent:string} }) => {
  const eventId = params.ShareEvent;
  // Fetch the workspace data
  const eventDataPromise = GetEventById({ eventId });

  return (
    <Suspense fallback={<Loading />}> 
      <Await promise={eventDataPromise}>
        {({ data, error }) => (
          <ShareEventPage 
            eventData={data}
            error={error}
          />
        )}
      </Await>
    </Suspense>
    
  );
};

export default WorkspaceMain;
