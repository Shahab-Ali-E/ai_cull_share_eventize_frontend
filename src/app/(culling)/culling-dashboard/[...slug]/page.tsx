import { Suspense } from "react";

// components
import Await from "./Await";
import Loading from "./loading";
import WorkSpacePage from "./WorkSpacePage";

// apis
import { GetWorkSpaceById } from "@/lib/actions/GetUserWorkSpaces";
import { CulledImagesMetadataResponse, GetCulledImagesMetadata } from "@/lib/actions/GetCulledImages";
// import ImagePreview from "./ImagesPreview";
import WorkSpaceAfterCullHeader from "@/components/Culling/WorkSpaceComponents/AfterCullHeader";
import ImagePreview from "./ImagesPreview";

const WorkspaceMain = ({ params }: { params: { slug: string[] } }) => {
  const workSpaceId = String(params.slug[0]);

  // Fetch the workspace data
  const presignedUrlPromise = GetWorkSpaceById({ workSpaceId });

  if (params.slug.length === 2) {
    // Fetch the workspace data with culling metadata
    const culledImagesPromise = GetCulledImagesMetadata({ workSpaceId: params.slug[0], detection_status: params.slug[1] });

    return (
      <Suspense fallback={<Loading />}>
        <Await promise={culledImagesPromise}>
          {({ data, error }: { data: CulledImagesMetadataResponse[] | [], error: string | null }) => (
            error ? (
              <div>Error: {error}</div>
            ) : (
              <section className="flex flex-col min-h-screen p-2">
                <WorkSpaceAfterCullHeader 
                  heading={params.slug[1]}
                />
                <div className="flex flex-wrap gap-5 justify-center mt-5">
                  
                  {/* <Gallery images={const images = data.map((ele)=>ele.download_path)} /> */}
                  {data?.map((data, index) => (
                    <div key={index} className="flex justify-center">
                      <ImagePreview 
                        images={data.download_path} 
                      />
                    </div>
                  ))}
                </div>
              </section>
            )
          )}
        </Await>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}> 
      <Await promise={presignedUrlPromise}>
        {({ data, error }) => (
          <WorkSpacePage 
            workSpaceData={data}
            error={error}
          />
        )}
      </Await>
    </Suspense>
    
  );
};

export default WorkspaceMain;
