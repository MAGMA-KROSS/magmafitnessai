import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes that should be publicly accessible
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/calculators/(.*)',
  '/calculators',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/(.*)' // Assuming you want all API routes to be accessible
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are not defined as public
  if (!isPublicRoute(req)) {
    return auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and API routes that are handled above.
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Re-include the root route.
    '/',
  ],
};