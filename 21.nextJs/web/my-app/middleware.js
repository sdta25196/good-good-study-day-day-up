import { userAgent, NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl
  const { device, engine } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  if (engine.name === 'Trident') {

    return NextResponse.rewrite(new URL('/ie', request.url))
  }
  return NextResponse.rewrite(url)

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}