import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Protect delivery routes
  if (pathname.startsWith('/delivery')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/auth') && token) {
    if (pathname.includes('admin')) return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    if (pathname.includes('delivery')) return NextResponse.redirect(new URL('/delivery', request.url));
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/admin/:path*', '/delivery/:path*'],
};
