function SmartShareLayout({ children }: { children: React.ReactNode }) {

  return (
    <section className="flex flex-col bg-secondary">
      <div>{children}</div>
    </section>
  );
}

export default SmartShareLayout;
