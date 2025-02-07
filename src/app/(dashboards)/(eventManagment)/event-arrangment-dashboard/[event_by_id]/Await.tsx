export default async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
}) {
  const data = await promise;
  // Check if data contains a 404 error and return NotFound if so
  if (data.error) {
    return <section>
      <h1 className="text-green-500 text-3xl">Not found</h1>
    </section>;
  }

  return children(data as T); // Pass data to children (WorkSpacePage)
}
