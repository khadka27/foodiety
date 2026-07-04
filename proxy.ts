import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' ws: wss: https:",
      "media-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  // Handle error pages routing
  const pathname = request.nextUrl.pathname;

  // Custom error page redirects
  if (pathname === '/forbidden') {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if (pathname === '/maintenance') {
    return NextResponse.redirect(new URL('/503', request.url));
  }

  // Analytics tracking for error pages
  if (pathname.match(/^\/(404|403|500|503)$/)) {
    // You can add analytics tracking here
    console.log(`Error page visited: ${pathname}`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};