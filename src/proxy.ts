import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require specific roles
const ADMIN_PREFIX = "/admin";
const RETAILER_PREFIX = "/retailer";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the JWT token 
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;

  // ─── ADMIN ROUTES 
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userRole !== "admin") {
      if (userRole === "retailer") {
        return NextResponse.redirect(new URL("/retailer", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ─── RETAILER ROUTES 
  if (pathname.startsWith(RETAILER_PREFIX)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userRole !== "retailer") {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ─── PUBLIC ROUTES 
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/retailer/:path*"],
};
