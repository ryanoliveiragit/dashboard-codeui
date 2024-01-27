import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const signInURL = new URL("/auth", request.url);
  const dashboardURL = new URL("/", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/auth") {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInURL);
  }

  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ["/auth", "//:path*"],
};
