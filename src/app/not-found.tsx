import Custom404 from "@/components/custom-404";
import Navbar from "@/components/navbar";

export default function NotFound() {
  return (
    <section className="flex flex-col bg-card min-h-screen">
      <section className="flex justify-center">
        <Navbar />
      </section>
      <section className="flex">
        <Custom404 />
      </section>
    </section>
  );
}
