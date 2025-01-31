export default async function Await<T>({
    promise,
    children
  }: {
    promise: Promise<T>
    children: (value: T) => JSX.Element
  }) {
    // await new Promise(resolve=>setTimeout(resolve,2000))
    const data = await promise
    return children(data)
  }