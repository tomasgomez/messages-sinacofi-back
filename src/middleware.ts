import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;
const unauthenticatedRoutes = ['/'];

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req: req, secret: secret, raw: true });
  const isAuthenticated = !!token;
    if (isAuthenticated && unauthenticatedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/messages/inbox', req.url));
    }
    if (!isAuthenticated && req.nextUrl.pathname.startsWith('/messages')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (
      req.nextUrl.pathname.startsWith('/api') 
      && !req.nextUrl.pathname.includes('/api/auth') 
      // && !unauthenticatedApiRoutes.includes(req.nextUrl.pathname)
    ) {
      if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.next();
    }
};


export const config = { matcher: ["/messages/:path*"] }