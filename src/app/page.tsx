// app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  // as soon as this component is rendered, Next.js issues a 307 redirect
  redirect("/Home");
}
