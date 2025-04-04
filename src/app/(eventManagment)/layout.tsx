import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

function EventManagmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="flex flex-col space-y-12 bg-card scrollbar-thumb-rose-600"
    >
      {/* Navbar */}
      <Navbar />
      <div className="w-full pt-20 px-2 md:px-10">{children}</div>
      <Footer />
    </section>
  );
}

export default EventManagmentLayout;
