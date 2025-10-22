import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req:any) {
  const url = req.nextUrl.clone();

  // Redirect root `/` to `/ar`
  if (url.pathname === '/') {
 
    return intlMiddleware(req);
  }


}

export const config = {
  matcher: ['/', '/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
