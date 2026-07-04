import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { EnrollForm } from '@/components/crm/EnrollForm'
import { PageHeader } from '@/components/crm/ui'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export const dynamic = 'force-dynamic'

export default async function EnrollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const [{ data: offering }, { data: people }, { data: packages }] = await Promise.all([
    supabase.from('offerings').select('id, name').eq('id', id).single(),
    supabase.from('people').select('id, full_name, dance_role').order('full_name'),
    supabase.from('packages').select('id, name, person_id').eq('archived', false),
  ])
  if (!offering) notFound()
  return (
    <div>
      <div className="mb-6">
        <Link href={`/crm/offerings/${id}`} className="flex items-center gap-1 text-sm text-[#9A907F] hover:text-[#C9A84C]">
          <ArrowLeft size={14} weight="light" /> Back to {offering.name}
        </Link>
      </div>
      <PageHeader title="Enroll dancer" subtitle={offering.name} />
      <EnrollForm offeringId={id} people={people ?? []} packages={packages ?? []} />
    </div>
  )
}
