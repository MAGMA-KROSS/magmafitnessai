import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding(.*)',
  '/api(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in protected routes
    '/((?!_next|[^?]*\\.(?:html?|css|js|svg|ico|png|jpe?g|gif|json)$).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};