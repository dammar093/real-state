// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth';

const protectedRoutes = ['/dashboard', '/profile', '/booking'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If route is not protected, allow
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  const payload = verifyJWT(token);

  if (!payload) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Role-based protection example:
  // If trying to access /dashboard and not admin, redirect
  if (pathname.startsWith('/dashboard') && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, allow
  return NextResponse.next();
}

// Config
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/booking/:path*',
  ],
};
