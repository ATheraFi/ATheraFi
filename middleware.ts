import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const origin = request.headers.get('origin')

  return NextResponse.next()
}

// Stop Middleware running on static files
export const config = { matcher:  '/api/:path*' };


// '/((?!_next/image|_next/static|favicon.ico).*)', 