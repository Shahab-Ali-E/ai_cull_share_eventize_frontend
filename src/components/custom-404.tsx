import Link from "next/link";


interface Custom404Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function Custom404({
  title = "Uh-oh!",
  description = "We couldn't find the page you were looking for.",
  buttonText = "Go Back Home",
  buttonHref = "/",
}: Custom404Props) {


  return (
    <div className="grid h-screen place-content-center w-full bg-card px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-primary">404</h1>

        <p className="text-2xl font-bold tracking-tight text-muted-foreground sm:text-4xl">
          {title}
        </p>

        <p className="mt-4 text-muted-foreground">{description}</p>

        <Link
          href={buttonHref}
          className="mt-6 inline-flex bg-gradient-to-r from-purple-600 to-teal-400 text-white font-semibold px-5 py-3 rounded-[8px] shadow-md hover:opacity-90 focus:outline-none items-center justify-center"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
