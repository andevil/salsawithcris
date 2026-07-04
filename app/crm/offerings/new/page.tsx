import { PageHeader } from '@/components/crm/ui'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { OfferingForm } from '@/components/crm/OfferingForm'
import type { OfferingType } from '@/lib/supabase/types'

export default async function NewOfferingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const offeringType = (params.type === 'course' || params.type === 'workshop' ? params.type : undefined) as OfferingType | undefined

  return (
    <div>
      <div className="mb-6">
        <Link href="/crm/offerings" className="flex items-center gap-1 text-sm text-[#9A907F] hover:text-[#C9A84C]">
          <ArrowLeft size={14} weight="light" /> Back
        </Link>
      </div>
      <PageHeader title="Add offering" />
      <OfferingForm offeringType={offeringType} />
    </div>
  )
}
