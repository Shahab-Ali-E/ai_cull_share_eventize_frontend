import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"


// clerk middle ware

const isProtectedRoute = createRouteMatcher([
  '/culling-dashboard(.*)',
  '/book-event(.*)',
  '/get-images(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


// export async function middleware(request: NextRequest) {
//   // Request pathname const
//   const requestPathname = request.nextUrl.pathname

//   // Set a header with path so I can get that info in my server components
//   const requestHeaders = new Headers(request.headers)
//   requestHeaders.set("x-pathname", requestPathname)
  
//   // Some code here ...

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   })
// }

