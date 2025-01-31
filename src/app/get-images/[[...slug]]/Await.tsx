export default async function Await<T>({
    promise,
    children,
  }: {
    promise: Promise<T>;
    children: (value: T) => JSX.Element;
  }) {
    try {
      const data = await promise;

      // If data contains a 404-like response, render the "Not found" message
      if (!data || (data as any)?.error) {
        return (
          <section className="text-primary bg-secondary">
            <h1>Not found</h1>
          </section>
        );
      }
  
      // Pass valid data to children
      return children(data as T);
    } catch {
      // Catch any API errors and display "Not found"
      return (
        <section className="text-primary bg-secondary">
          <h1>Not found</h1>
        </section>
      );
    }
  }
  