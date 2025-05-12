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
import { Metadata } from "next";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [workSpaceId, extraTitle] = slug;
  const token = await getClerkToken();
  const workspaceResponse = await GetWorkSpaceById({ workSpaceId, token });

  if (!workspaceResponse.data) {
    return {
      title: "Workspace Not Found",
      description: "The workspace you are looking for does not exist.",
      keywords: ["workspace", "not found", "culling workspace missing"],
    };
  }

  const titleBase = `Culling Dashboard | ${workspaceResponse.data.name}`;
  const title = extraTitle ? `${titleBase} | ${extraTitle}` : titleBase;

  return {
    title,
    description:
      "Create, manage, and organize your events. View event details, sort, paginate, and delete event to maintain an efficient photo sharing process.",
    keywords: [
      "Ai culling",
      "culling online",
      "culling without downloading the software",
      "culling workspace",
      "eventize",
      "photo culling",
      "automated culling",
      "culling dashboard",
      "workspace optimization",
    ],
  };
}


const WorkspaceMain = async ({ params }: { params: { slug: string[] } }) => {
 
  const workSpaceId = String(params.slug[0]);
  // getting clerk token to access backend end apis
  const token = await getClerkToken();
  // Fetch the workspace data
  const workspaceByIdPromise = GetWorkSpaceById({ workSpaceId, token: token });

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
      <Await promise={workspaceByIdPromise}>
        {({ data, error }) => (
          <WorkSpacePage workSpaceData={data} error={error} />
        )}
      </Await>
    </Suspense>
  );
};

export default WorkspaceMain;
