import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  if (process.env.VERCEL_ENV !== 'development') {
    console.log('Middleware is only active in development mode.');
    return NextResponse.next();
  }

  if (hostname === process.env.HOST_MAIN_NAME) {
    return NextResponse.rewrite(url);
  }

  if (hostname === process.env.HOST_SUBDOMAIN_NAME) {
    url.pathname = `/tweets${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
