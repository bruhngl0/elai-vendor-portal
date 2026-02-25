import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export default auth((req: any) => {
  // Protection middleware for admin routes
  if (req.nextUrl.pathname.startsWith('/admin') ||
    req.nextUrl.pathname.startsWith('/api/admin')) {

    const session = req.auth

    if (!session?.user) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    // Check if user is admin
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}