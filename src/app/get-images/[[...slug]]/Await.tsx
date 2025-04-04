import Custom404 from "@/components/custom-404";

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
          <Custom404 title="Not Found" description={`${(data as any)?.error}`}/>
        );
      }
  
      // Pass valid data to children
      return children(data as T);
    } catch {
      // Catch any API errors and display "Not found"
      return (
        <Custom404 />
      );
    }
  }
  