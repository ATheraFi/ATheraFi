import { NextResponse } from "next/server";
import { authMiddleware  } from "@clerk/nextjs";

const allowedOrigins = process.env.NODE_ENV === "production" 
  ? ['https://www.atherafi.com', 'https://atherafi.com'] 
  : ['http://localhost:3000']

export function middleware(request: Request) {
  const origin = request.headers.get('origin')

  if (origin && !allowedOrigins.includes(origin)) {
    console.log("THE FUCK")
    return new NextResponse(null, { 
      status: 400,
      statusText: "Bad Request",
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  return NextResponse.next()
}

export default authMiddleware({
  beforeAuth: (req) => {
    return middleware(req);
  },
  publicRoutes: ['/', '/profile']
});

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };