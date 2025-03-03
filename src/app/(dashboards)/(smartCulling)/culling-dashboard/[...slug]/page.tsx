import { Suspense } from "react";

// components
import Await from "./Await";
import Loading from "./loading";
import WorkSpacePage from "./WorkSpacePage";
import DownloadAction from "@/components/Culling/WorkSpaceComponents/DownloadAction";
import ImagesHighlights from "./ImagesHighlights";

// apis
import { GetWorkSpaceById } from "@/lib/actions/Culling/GetUserWorkSpaces";
import { GetCulledImagesMetadata } from "@/lib/actions/Culling/GetCulledImages";
import { ImagesMetadataResponse } from "@/@types/smart-culling";
import { getClerkToken } from "@/lib/actions/clerk-token";

const WorkspaceMain = async ({ params }: { params: { slug: string[] } }) => {
  const workSpaceId = String(params.slug[0]);
  // getting clerk token to access backend end apis
  const token = await getClerkToken();
  // Fetch the workspace data
  const presignedUrlPromise = GetWorkSpaceById({ workSpaceId, token: token });

  if (params.slug.length === 2) {
    // Fetch the workspace data with culling metadata
    const culledImagesPromise = GetCulledImagesMetadata({
      workSpaceId: params.slug[0],
      detection_status: params.slug[1],
      token:token
    });

    return (
      <Suspense fallback={<Loading />}>
        <Await promise={culledImagesPromise}>
          {({
            data,
            error,
          }: {
            data: ImagesMetadataResponse[] | [];
            error: string | null;
          }) =>
            error ? (
              <div>Error: {error}</div>
            ) : (
              <section className="flex flex-col min-h-screen px-4 sm:px-5 space-y-4">
                <DownloadAction />
                <section className="flex flex-col">
                  <ImagesHighlights noOfImages={data.length} images={data} />
                </section>
              </section>
            )
          }
        </Await>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Await promise={presignedUrlPromise}>
        {({ data, error }) => (
          <WorkSpacePage workSpaceData={data} error={error} />
        )}
      </Await>
    </Suspense>
  );
};

export default WorkspaceMain;
