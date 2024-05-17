
import { NextFetchEvent, NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    console.log('# middleware')
    // if(false) {
    //   return NextResponse.redirect(new URL('http://localhost:3000/api/callback', request.url))
    // }
    event.waitUntil(
      fetch(`http://localhost:3000/api/auth`, {
        method: 'GET',
      })
    )
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}