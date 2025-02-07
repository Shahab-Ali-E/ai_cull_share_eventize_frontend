function SmartShareLayout({ children }: { children: React.ReactNode }) {

    return (
      <section className="flex flex-col bg-secondary min-h-screen">
        <section>{children}</section>
      </section>
    );
  }
  
  export default SmartShareLayout;
  