import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Note: updateSession's redirect-to-login only triggers for paths starting
  // with '/crm' (page routes), so '/api/crm/*' requests always pass through
  // here untouched — never an HTML redirect. Each /api/crm route handler
  // additionally guards itself with requireUser() (lib/supabase/apiAuth.ts)
  // and returns a proper JSON 401 when there's no authenticated user.
  return updateSession(request)
}

export const config = {
  matcher: ['/crm/:path*', '/api/crm/:path*'],
}
