import { Suspense } from "react";

// components
import Await from "./Await";
import Loading from "./loading";
import WorkSpacePage from "./WorkSpacePage";
import WorkSpaceAfterCullHeader from "@/components/Culling/WorkSpaceComponents/AfterCullHeader";
import ImagesHighlights from "./ImagesHighlights";

// apis
import { GetWorkSpaceById } from "@/lib/actions/GetUserWorkSpaces";
import { GetCulledImagesMetadata } from "@/lib/actions/GetCulledImages";
import { CulledImagesMetadataResponse } from "@/@types/smart-culling";

const WorkspaceMain = ({ params }: { params: { slug: string[] } }) => {
  const workSpaceId = String(params.slug[0]);

  // Fetch the workspace data
  const presignedUrlPromise = GetWorkSpaceById({ workSpaceId });

  if (params.slug.length === 2) {
    // Fetch the workspace data with culling metadata
    const culledImagesPromise = GetCulledImagesMetadata({
      workSpaceId: params.slug[0],
      detection_status: params.slug[1],
    });

    return (
      <Suspense fallback={<Loading />}>
        <Await promise={culledImagesPromise}>
          {({
            data,
            error,
          }: {
            data: CulledImagesMetadataResponse[] | [];
            error: string | null;
          }) =>
            error ? (
              <div>Error: {error}</div>
            ) : (
              <section className="flex flex-col min-h-screen">
                <WorkSpaceAfterCullHeader heading={params.slug[1]} />

                <section className="flex flex-col mt-10 px-10">
                  <ImagesHighlights noOfImages={data.length} images={data} />
                </section>
              </section>
              // {/* <div className="grid grid-cols-4 2xl:grid-col-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-3 sm:gap-4 mt-0 sm:mt-14 justify-start p-6">

              //   {data?.map((data, index) => (
              //     <div key={index} className="flex">
              //       <ImagePreview
              //         images={data.images_download_path}
              //       />
              //     </div>
              //   ))}
              // </div> */}
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
