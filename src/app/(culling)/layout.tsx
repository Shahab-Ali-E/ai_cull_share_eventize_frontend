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

  //hard code data for testing
  // const pictureURL:string = "https://lh3.googleusercontent.com/a/ACg8ocLwrlUEjcPphC54KRQnzKqipGm2ep8pTK98Du394rcaSKy5vg4=s324-c-no"
  // const cleanedName: string = "shahab"
  // const cleanedEmail: string = "malikshahabali@gmail.com"
  // const profileImageUrl:string = pictureURL?.replace(/^"|"$/g, '');
  // const fallBack:string = "SA"

  //cleaned the user name
  const cleanedName: string = name?.replace(/^"|"$/g, '');
  const cleanedEmail: string = email?.replace(/^"|"$/g, '');
  const profileImageUrl:string = pictureURL?.replace(/^"|"$/g, '');
  const fallBack:string = cleanedName.split(" ").map(name=>name[0]).join('').toUpperCase();

  // console.log(cleanedName);
  // console.log(cleanedEmail);
  // console.log(pictureURL)

  return (
    <section className="flex flex-col bg-primary-foreground">
      <CullingDashboardHeader 
        profileImage={profileImageUrl}
        userEmail={cleanedEmail}
        profileFallBack={fallBack}
      />
      <div>{children}</div>
    </section>
  );
}

export default CullingLayout;
