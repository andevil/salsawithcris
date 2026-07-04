import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/apiAuth'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const unauthorized = await requireUser(supabase)
  if (unauthorized) return unauthorized

  const body = await request.json()

  const { data, error } = await supabase
    .from('packages')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const unauthorized = await requireUser(supabase)
  if (unauthorized) return unauthorized

  // Archive instead of hard delete
  const { error } = await supabase
    .from('packages')
    .update({ archived: true })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
