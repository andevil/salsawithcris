'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import { Field, Select, Input, Button, Card } from '@/components/crm/ui'

const schema = z.object({
  person_id:         z.string().min(1, 'Required'),
  enrollment_status: z.string().default('active'),
  start_date:        z.string(),
  package_id:        z.string().optional(),
  payment_status:    z.string().default('unpaid'),
  notes:             z.string().optional(),
})

type F = z.infer<typeof schema>

interface PersonOption { id: string; full_name: string; dance_role: string }
interface PackageOption { id: string; name: string; person_id: string }

export function EnrollForm({ offeringId, people, packages = [] }: {
  offeringId: string
  people: PersonOption[]
  packages?: PackageOption[]
}) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { start_date: format(new Date(), 'yyyy-MM-dd'), enrollment_status: 'active', package_id: '', payment_status: 'unpaid' },
  })

  const selectedPersonId = useWatch({ control, name: 'person_id' })

  const availablePackages = useMemo(
    () => packages.filter(p => p.person_id === selectedPersonId),
    [packages, selectedPersonId]
  )

  const onSubmit = async (values: F) => {
    setSubmitError(null)
    const supabase = createClient()
    const { error } = await supabase.from('enrollments').upsert({
      offering_id:       offeringId,
      person_id:         values.person_id,
      enrollment_status: values.enrollment_status,
      start_date:        values.start_date,
      package_id:        values.package_id || null,
      payment_status:    values.payment_status,
      notes:             values.notes || null,
    }, { onConflict: 'person_id,offering_id' })
    if (error) { setSubmitError(error.message); return }
    router.push(`/crm/offerings/${offeringId}`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mb-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Person" htmlFor="person_id" error={errors.person_id?.message} className="sm:col-span-2">
            <Select id="person_id" {...register('person_id')}>
              <option value="">Select dancer…</option>
              {people.map(p => <option key={p.id} value={p.id}>{p.full_name} ({p.dance_role})</option>)}
            </Select>
          </Field>
          <Field label="Enrollment status" htmlFor="enrollment_status">
            <Select id="enrollment_status" {...register('enrollment_status')}>
              {['active','trial','invited','paused','registered'].map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
          <Field label="Start date" htmlFor="start_date">
            <Input id="start_date" type="date" {...register('start_date')} />
          </Field>
          <Field label="Package" htmlFor="package_id">
            <Select id="package_id" {...register('package_id')}>
              <option value="">Drop-in / no package</option>
              {availablePackages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
          </Field>
          <Field label="Payment status" htmlFor="payment_status">
            <Select id="payment_status" {...register('payment_status')}>
              {['unpaid','paid','partial','overdue'].map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </Field>
        </div>
      </Card>
      {submitError && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{submitError}</p>
      )}
      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : 'Enroll dancer'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  )
}
