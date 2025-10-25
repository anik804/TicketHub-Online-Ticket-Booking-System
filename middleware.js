import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.pathname;

  // If not logged in → go to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const role = token.role?.toLowerCase();

  // If someone visits plain /dashboard → redirect them to their own dashboard
  if (url === "/dashboard" || url === "/dashboard/") {
    if (role === "user")
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    if (role === "organizer")
      return NextResponse.redirect(new URL("/dashboard/organizer", req.url));
    if (role === "admin")
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  }

  // Role-specific protection
  if (url.startsWith("/dashboard/user") && role !== "user") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (url.startsWith("/dashboard/organizer") && role !== "organizer") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (url.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
