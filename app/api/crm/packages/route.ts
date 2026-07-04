import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/apiAuth'

export async function POST(request: Request) {
  const supabase = await createClient()
  const unauthorized = await requireUser(supabase)
  if (unauthorized) return unauthorized

  const body = await request.json()

  const { bonus_items, ...packageData } = body

  // Create the package
  const { data: pkg, error } = await supabase
    .from('packages')
    .insert(packageData)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Create bonus records if any
  if (bonus_items && bonus_items.length > 0) {
    const bonuses = bonus_items.map((b: { type: string; label: string }) => ({
      package_id: pkg.id,
      bonus_type: b.type,
      label:      b.label,
    }))
    const { error: bonusError } = await supabase.from('package_bonuses').insert(bonuses)
    if (bonusError) {
      console.error('Failed to insert bonuses:', bonusError.message)
      return NextResponse.json({
        error: `Package was created, but bonuses failed to save: ${bonusError.message}`,
        package: pkg,
      }, { status: 500 })
    }
  }

  return NextResponse.json(pkg, { status: 201 })
}
