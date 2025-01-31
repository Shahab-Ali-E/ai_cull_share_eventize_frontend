import Navbar from "@/components/navbar";

function GetImagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col bg-secondary space-y-5 min-h-screen">
      <section className="flex flex-col w-full">

      <Navbar />
      </section>

      <section>

      {children}
      </section>
    </section>
  );
}

export default GetImagesLayout;
