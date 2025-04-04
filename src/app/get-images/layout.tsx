import Navbar from "@/components/navbar";

function GetImagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col w-full h-full bg-card min-h-screen">
      <Navbar />

      <section className="flex flex-col w-full">{children}</section>
    </section>
  );
}

export default GetImagesLayout;
