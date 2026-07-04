import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Defense-in-depth auth guard for /api/crm/* route handlers.
 * RLS is the primary protection; this rejects unauthenticated requests early
 * with a proper JSON 401 instead of relying solely on the DB layer.
 *
 * Usage:
 *   const supabase = await createClient()
 *   const unauthorized = await requireUser(supabase)
 *   if (unauthorized) return unauthorized
 */
export async function requireUser(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<NextResponse | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
