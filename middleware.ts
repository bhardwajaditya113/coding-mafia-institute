import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // This is a basic middleware - in production, you'd check authentication tokens
  // For now, we'll let the client-side handle authentication checks
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/account/:path*',
  ],
}
