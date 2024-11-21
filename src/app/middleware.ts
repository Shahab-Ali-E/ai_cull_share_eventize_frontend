import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Request pathname const
  const requestPathname = request.nextUrl.pathname

  // Set a header with path so I can get that info in my server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", requestPathname)
  
  // Some code here ...

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}