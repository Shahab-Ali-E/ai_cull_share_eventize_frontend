// import Spinner from "@/components/animata/progress/spinner";
import CullingDashboardHeader from "@/components/Culling/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


function CullingLayout({ children }: { children: React.ReactNode }) {

  // getting email and name from cookies
  const name:string = cookies().get('name')?.value as string;
  const email:string = cookies().get('email')?.value as string;
  const pictureURL:string = cookies().get("picture")?.value as string;

  if (!name || !email) {
    redirect("/login");
  }

  //cleaning the user data
  const cleanedName: string = name?.replace(/^"|"$/g, '');
  const cleanedEmail: string = email?.replace(/^"|"$/g, '');
  const profileImageUrl:string = pictureURL?.replace(/^"|"$/g, '');
  const fallBack:string = cleanedName.split(" ").map(name=>name[0]).join('').toUpperCase();

  console.log(cleanedName);
  console.log(cleanedEmail);
  console.log(pictureURL)

  return (
    <div className="flex flex-col h-screen bg-secondary">
      <CullingDashboardHeader 
        profileImage={profileImageUrl}
        userEmail={cleanedEmail}
        userName={cleanedName}
        profileFallBack={fallBack}
      />
      <div>{children}</div>
    </div>
  );
}

export default CullingLayout;
