import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/api/user/(.*)",  // protect your onboarding route
    "/((?!_next|.*\\..*).*)",
  ],
};
