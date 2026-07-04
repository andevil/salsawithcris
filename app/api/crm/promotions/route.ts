import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/apiAuth'

export async function POST(request: Request) {
  const supabase = await createClient()
  const unauthorized = await requireUser(supabase)
  if (unauthorized) return unauthorized

  const body = await request.json()

  const { data, error } = await supabase
    .from('promotions')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
