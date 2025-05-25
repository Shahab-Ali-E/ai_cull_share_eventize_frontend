import Custom404 from "@/components/custom-404";
type WithOptionalError<T> = T & { error?: string };

export default async function Await<T extends object>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
}) {
  try {
    const data = await promise as WithOptionalError<T>;

    if (!data || data.error) {
      return (
        <Custom404
          title="Not Found"
          description={`${data.error ?? "Something went wrong"}`}
        />
      );
    }

    return children(data);
  } catch {
    return <Custom404 />;
  }
}
