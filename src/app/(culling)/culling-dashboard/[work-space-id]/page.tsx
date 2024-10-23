//components
import WorkSpaceHeader from "@/components/Culling/WorkSpaceComponents/Header";
import ImagePreview from "./ImagesPreview";
import UploadImages from './UploadImages'

//apis
import { getWorkSpaceById } from "@/lib/actions/GetUserWorkSpaces";
import { GetBeforeCullPresignedUrl } from "@/lib/actions/GetBeforeCullPresingedUrl";


const WorkspacePage = async ({ params }: { params: { 'work-space-id': string } }) => {
  // Extract the ID from params and convert it to a number
  const folder_id = Number(params["work-space-id"]);

  // Fetch workspace data based on the ID
  const { data , error } = await getWorkSpaceById({ folder_id });
  
  if (error) {   
    return <div>Error: {error}</div>;
  }

  //checking if images already uploaded
  const response = await GetBeforeCullPresignedUrl({ workSpaceId: folder_id });
  const hasImagesUploaded = response?.urls?.length > 0;

  if(response.error){
    return <div className="text-primary">Error: {response.error}</div>;
  }

  console.log("has uplaoded")
  console.log(hasImagesUploaded)
  
  return (
    <section className="flex flex-col min-h-screen p-2">
        {/* header section */}
        <WorkSpaceHeader 
            label={data?.name || 'workspace not found'}
            showCullingButton = {hasImagesUploaded}
        />
        
        {/* body section of workspaces if there's already images uploaded then show ImagePreview else drop down */}
        <div className="flex flex-col mt-10 p-5">
          {hasImagesUploaded ?
            (
              <ImagePreview 
                imagesUrl={response.urls}
              />
            ) : 
            (
              <UploadImages workSpaceName={data?.name || ''} workSpaceId={folder_id}/>
            )
          }
        </div>
    </section>
  );
};

export default WorkspacePage;
