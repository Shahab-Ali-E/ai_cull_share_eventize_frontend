export default async function Await<T>({
    promise,
    children,
  }: {
    promise: Promise<T>;
    children: (value: T) => JSX.Element;
  }) {
    const data = await promise;
    console.log("data",data)

    return children(data);
  }
  