import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-secondary ">
      {/* nav bar */}
      <Navbar />
      <div className="flex items-center justify-center mt-32 mb-20">{children}</div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
