// Path: middleware.ts
// Middleware for protecting routes based on authentication

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = [
    '/my-apulink',
    '/projects',
    '/settings',
    '/professional/dashboard',
    '/buyer/dashboard',
    '/admin',
  ];

  // Auth routes that should redirect if already logged in
  const authRoutes = ['/login', '/register', '/auth'];

  const path = req.nextUrl.pathname;

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to appropriate dashboard if accessing auth routes while logged in
  if (isAuthRoute && session) {
    // Determine user role and redirect accordingly
    // For now, redirect to a general dashboard
    return NextResponse.redirect(new URL('/my-apulink', req.url));
  }

  // Role-based route protection
  if (session) {
    // Admin routes
    if (path.startsWith('/admin') && !session.user.email?.endsWith('@apulink.com')) {
      return NextResponse.redirect(new URL('/my-apulink', req.url));
    }

    // You can add more role-based checks here
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
