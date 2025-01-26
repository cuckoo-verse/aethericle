import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let locale = request.cookies.get('locale')?.value
  
  if (!locale) {
    const acceptLanguage = request.headers.get('Accept-Language')
    locale = acceptLanguage?.startsWith('zh-CN') ? 'zh-CN' : 'en'
  }

  const response = NextResponse.next()
  response.cookies.set('locale', locale)
  
  return response
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
