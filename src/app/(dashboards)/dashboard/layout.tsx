import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

function SmartShareLayout({ children }: { children: React.ReactNode }) {
    return (
      <section className="flex flex-col bg-secondary min-h-screen">
        {children}
      </section>
    );
  }
  
  export default SmartShareLayout;
  