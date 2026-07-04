import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { fmtTime } from '@/lib/utils'
import { PageHeader, Badge, Card, Button, EmptyState } from '@/components/crm/ui'
import { statusBadge } from '@/components/crm/ui'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { format, parseISO } from 'date-fns'

export const dynamic = 'force-dynamic'

type TypeFilter = 'course' | 'workshop' | undefined

export default async function OfferingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const type = (params.type === 'course' || params.type === 'workshop' ? params.type : undefined) as TypeFilter

  const supabase = await createClient()

  let query = supabase.from('offerings').select('*').order('day_of_week').order('start_time')
  if (type) query = query.eq('offering_type', type)
  const { data: offerings } = await query

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('offering_id')
    .in('enrollment_status', ['active', 'trial', 'registered'])

  const countByOffering = (offeringId: string) =>
    enrollments?.filter(e => e.offering_id === offeringId).length ?? 0

  const tabs: { label: string; value: TypeFilter }[] = [
    { label: 'All', value: undefined },
    { label: 'Courses', value: 'course' },
    { label: 'Workshops', value: 'workshop' },
  ]

  return (
    <div>
      <PageHeader
        title="Offerings"
        subtitle="Courses & workshops"
        action={
          <Link href="/crm/offerings/new">
            <Button><Plus size={16} weight="light" /> Add offering</Button>
          </Link>
        }
      />

      <div className="mb-6 flex gap-2">
        {tabs.map(t => (
          <Link
            key={t.label}
            href={t.value ? `/crm/offerings?type=${t.value}` : '/crm/offerings'}
            className={`border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
              type === t.value
                ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#171410]'
                : 'border-[#E2DDD5] text-[#9A907F] hover:border-[#C9A84C]/40'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {offerings?.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offerings.map(o => {
            const enrolled = countByOffering(o.id)
            const pct = o.capacity ? Math.round((enrolled / o.capacity) * 100) : 0
            return (
              <Link key={o.id} href={`/crm/offerings/${o.id}`}>
                <Card className="h-full cursor-pointer transition-colors hover:border-[#C9A84C]/40">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-light text-[#171410]">{o.name}</h3>
                      {o.offering_type === 'course' && o.day_of_week ? (
                        <p className="mt-1 text-xs capitalize text-[#9A907F]">
                          {o.day_of_week} · {fmtTime(o.start_time)}–{fmtTime(o.end_time)}
                        </p>
                      ) : o.offering_type === 'workshop' && o.start_date ? (
                        <p className="mt-1 text-xs text-[#9A907F]">
                          {format(parseISO(o.start_date), 'EEE d MMM yyyy')} · {fmtTime(o.start_time)}
                        </p>
                      ) : null}
                    </div>
                    <Badge variant={statusBadge(o.status)}>{o.status}</Badge>
                  </div>
                  {o.location && (
                    <p className="mb-3 text-xs text-[#9A907F]">{o.location}</p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B6155]">{enrolled} dancer{enrolled !== 1 ? 's' : ''}</span>
                    {o.capacity && <span className="text-xs text-[#9A907F]">cap {o.capacity}</span>}
                  </div>
                  {o.capacity && (
                    <div className="mt-3 h-1 bg-[#E2DDD5]">
                      <div
                        className="h-1 bg-[#C9A84C] transition-all"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  )}
                  <div className="mt-3 flex justify-between text-xs text-[#9A907F]">
                    <span>
                      {o.offering_type === 'course'
                        ? `${o.default_price?.toLocaleString()} HUF / class`
                        : o.default_price > 0 ? `${o.default_price.toLocaleString()} HUF` : 'Free'}
                    </span>
                    <Badge variant="gray">{o.offering_type === 'course' ? (o.level ?? o.offering_type) : (o.workshop_type ?? o.offering_type)}</Badge>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <EmptyState
          message="No offerings yet."
          action={<Link href="/crm/offerings/new"><Button>Add first offering</Button></Link>}
        />
      )}
    </div>
  )
}
