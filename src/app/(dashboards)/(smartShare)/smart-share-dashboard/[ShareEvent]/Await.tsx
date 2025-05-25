import NotFound from "./not-found";

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
      return <NotFound />;
    }

    return children(data);
  } catch {
    return <NotFound />;
  }
}

