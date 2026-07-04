import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { createClient } from '@/lib/supabase/server'
import { PageHeader, Badge, Card, Button, Table, Th, Td, EmptyState } from '@/components/crm/ui'
import { statusBadge } from '@/components/crm/ui'
import { PencilSimple, ArrowLeft, Plus, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr'
import { SessionActions } from '@/components/crm/SessionActions'
import { AddSessionForm } from '@/components/crm/AddSessionForm'
import { DeleteButton } from '@/components/crm/DeleteButton'
import { PendingRegistrationActions } from '@/components/crm/PendingRegistrationActions'
import { fmtTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function OfferingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: offering }, { data: enrollments }, { data: sessions }, { data: pendingByOffering }, { data: pendingLegacy }] = await Promise.all([
    supabase.from('offerings').select('*').eq('id', id).single(),
    supabase
      .from('enrollments')
      .select('*, people(id, full_name, dance_role, dance_experience), packages(id, name)')
      .eq('offering_id', id),
    supabase
      .from('sessions')
      .select('*')
      .eq('offering_id', id)
      .order('date', { ascending: false })
      .limit(20),
    supabase
      .from('public_registrations')
      .select('*')
      .eq('offering_id', id)
      .in('status', ['pending', 'payment_sent'])
      .order('created_at', { ascending: true }),
    supabase
      .from('public_registrations')
      .select('*')
      .is('offering_id', null)
      .eq('event_id', id)
      .in('status', ['pending', 'payment_sent'])
      .order('created_at', { ascending: true }),
  ])

  if (!offering) notFound()

  // Merge pending registrations matched by offering_id and legacy rows matched by event_id, de-duped by id
  const pendingMap = new Map<string, NonNullable<typeof pendingByOffering>[number]>()
  ;[...(pendingByOffering ?? []), ...(pendingLegacy ?? [])].forEach(r => pendingMap.set(r.id, r))
  const pending = Array.from(pendingMap.values())

  const isCourse = offering.offering_type === 'course'
  const leaders   = enrollments?.filter(e => e.people?.dance_role === 'leader').length ?? 0
  const followers = enrollments?.filter(e => e.people?.dance_role === 'follower').length ?? 0

  const subtitle = isCourse
    ? [offering.day_of_week, offering.start_time ? fmtTime(offering.start_time) : null, offering.location].filter(Boolean).join(' · ')
    : [offering.start_date ? format(parseISO(offering.start_date), 'EEE d MMM yyyy') : null, offering.start_time ? fmtTime(offering.start_time) : null, offering.location].filter(Boolean).join(' · ')

  return (
    <div>
      <div className="mb-6">
        <Link href="/crm/offerings" className="flex items-center gap-1 text-sm text-[#9A907F] hover:text-[#C9A84C]">
          <ArrowLeft size={14} weight="light" /> Offerings
        </Link>
      </div>

      <PageHeader
        title={offering.name}
        subtitle={subtitle}
        action={
          <div className="flex gap-2">
            {offering.slug && (
              <a href={`/events/${offering.slug}`} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm"><ArrowSquareOut size={14} weight="light" /> Preview</Button>
              </a>
            )}
            <Link href={`/crm/offerings/${id}/edit`}>
              <Button variant="secondary" size="sm"><PencilSimple size={14} weight="light" /> Edit</Button>
            </Link>
            <DeleteButton table="offerings" id={id} redirectTo="/crm/offerings" label="Delete" />
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Enrolled',  value: enrollments?.length ?? 0 },
          { label: 'Capacity',  value: offering.capacity ?? '—' },
          { label: 'Leaders',   value: leaders },
          { label: 'Followers', value: followers },
        ].map(s => (
          <Card key={s.label}>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A907F]">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-light text-[#171410]">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Pricing */}
      <Card className="mb-6">
        <h3 className="mb-3 font-display text-lg font-light text-[#171410]">Pricing</h3>
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#9A907F]">
              {isCourse ? 'Drop-in price' : 'Price'}
            </p>
            <p className="mt-1 text-[#171410]">
              {offering.default_price > 0 ? `${offering.default_price.toLocaleString()} HUF` : 'Free'}
            </p>
          </div>
          {isCourse && offering.monthly_pass_price > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#9A907F]">Monthly pass</p>
              <p className="mt-1 text-[#171410]">{offering.monthly_pass_price.toLocaleString()} HUF</p>
            </div>
          )}
        </div>
      </Card>

      {/* Pending registrations */}
      {pending.length > 0 && (
        <Card className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-light text-[#171410]">
              Pending registration
              <span className="ml-2 text-sm font-normal text-[#C9A84C]">({pending.length})</span>
            </h3>
          </div>
          <div className="space-y-3">
            {pending.map(r => (
              <div key={r.id} className="flex items-start justify-between gap-4 border border-[#E2DDD5] p-4">
                <div>
                  <p className="font-medium text-[#171410]">{r.name}</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-[#6B6155]">
                    {r.email     && <span>{r.email}</span>}
                    {r.phone     && <span>{r.phone}</span>}
                    {r.instagram && <span>@{r.instagram}</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-[#9A907F]">
                    {r.dance_level && <span className="capitalize">{(r.dance_level as string).replace('-', ' ')}</span>}
                    {r.dance_role  && <span className="capitalize">{r.dance_role}</span>}
                    {r.coming_with_partner != null && (
                      <span>{r.coming_with_partner ? `With partner${r.partner_name ? `: ${r.partner_name}` : ''}` : 'Solo'}</span>
                    )}
                    <Badge variant={r.status === 'payment_sent' ? 'blue' : 'orange'}>
                      {(r.status as string).replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <PendingRegistrationActions id={r.id as string} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Enrolled dancers */}
      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-light text-[#171410]">Enrolled dancers</h3>
          <Link href={`/crm/offerings/${id}/enroll`}>
            <Button variant="secondary" size="sm"><Plus size={14} weight="light" /> Enroll dancer</Button>
          </Link>
        </div>
        {enrollments?.length ? (
          <Table>
            <thead>
              <tr><Th>Name</Th><Th>Role</Th><Th>Package</Th><Th>Payment</Th><Th>Status</Th></tr>
            </thead>
            <tbody>
              {enrollments.map(e => (
                <tr key={e.id}>
                  <Td>
                    <Link href={`/crm/people/${e.people?.id}`} className="font-medium hover:text-[#C9A84C]">
                      {e.people?.full_name}
                    </Link>
                  </Td>
                  <Td><Badge variant="gray">{e.people?.dance_role}</Badge></Td>
                  <Td><span className="text-xs">{e.packages?.name ?? 'drop-in'}</span></Td>
                  <Td><Badge variant={statusBadge(e.payment_status)}>{e.payment_status}</Badge></Td>
                  <Td><Badge variant={statusBadge(e.enrollment_status)}>{e.enrollment_status}</Badge></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No dancers enrolled yet." />
        )}
      </Card>

      {/* Sessions */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-light text-[#171410]">Class sessions</h3>
          <div className="flex gap-2">
            <AddSessionForm offeringId={id} />
            {offering.recurrence === 'weekly' && offering.day_of_week && <SessionActions offeringId={id} />}
          </div>
        </div>
        {sessions?.length ? (
          <Table>
            <thead>
              <tr><Th>Date</Th><Th>Time</Th><Th>Status</Th><Th>Attendance</Th><Th /></tr>
            </thead>
            <tbody>
              {sessions.map(s => (
                <tr key={s.id}>
                  <Td>{format(parseISO(s.date), 'EEE d MMM yyyy')}</Td>
                  <Td className="text-xs text-[#9A907F]">{fmtTime(s.start_time)}–{fmtTime(s.end_time)}</Td>
                  <Td><Badge variant={statusBadge(s.status)}>{s.status}</Badge></Td>
                  <Td>
                    <Link href={`/crm/attendance?session=${s.id}`} className="text-xs text-[#C9A84C] hover:underline">
                      Take attendance →
                    </Link>
                  </Td>
                  <Td>
                    <DeleteButton table="sessions" id={s.id} redirectTo={`/crm/offerings/${id}`} label="Delete" />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No sessions yet. Generate sessions from the schedule or add one manually." />
        )}
      </Card>
    </div>
  )
}
