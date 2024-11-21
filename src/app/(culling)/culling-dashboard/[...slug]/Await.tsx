import NotFound from "./not-found";

export default async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
}) {
  const data = await promise;
  console.log("data from await comp:",data)
  // Check if data contains a 404 error and return NotFound if so
  if (data.error) {
    return <NotFound />;
  }

  return children(data as T); // Pass data to children (WorkSpacePage)
}
