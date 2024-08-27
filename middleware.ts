import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const protectedRoutes = ['/dashboard', '/profile/:path*'];

    const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute && !req.nextauth.token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
);

export const config = {
  matcher: ['/dashboard', '/profile/:path*'],
};