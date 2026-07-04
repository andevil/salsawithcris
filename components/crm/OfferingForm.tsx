'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addWeeks, format, getDay, isBefore, isEqual, nextDay, parseISO } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import { Field, Input, Select, Textarea, Button, Card } from '@/components/crm/ui'
import { TimeSelect } from '@/components/crm/TimeSelect'
import { ImageUpload } from '@/components/crm/ImageUpload'
import type { Offering, OfferingType } from '@/lib/supabase/types'

const DOW_MAP: Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
}

async function syncSessions(supabase: ReturnType<typeof createClient>, offeringId: string, values: {
  day_of_week?: string; start_date?: string; end_date?: string
  start_time?: string; end_time?: string; location?: string
}) {
  if (!values.day_of_week || !values.end_date) return
  const endDate = parseISO(values.end_date)
  if (isBefore(endDate, new Date())) return   // end date is in the past — skip

  const dow = DOW_MAP[values.day_of_week]
  const rangeStart = values.start_date ? parseISO(values.start_date) : new Date()
  const startDow = getDay(rangeStart)
  let current = startDow === dow ? rangeStart : nextDay(rangeStart, dow)

  const sessions = []
  while (isBefore(current, endDate) || isEqual(current, endDate)) {
    sessions.push({
      offering_id: offeringId,
      date:        format(current, 'yyyy-MM-dd'),
      start_time:  values.start_time || null,
      end_time:    values.end_time   || null,
      location:    values.location   || null,
      status:      'scheduled',
    })
    current = addWeeks(current, 1)
  }

  if (sessions.length > 0) {
    await supabase.from('sessions').upsert(sessions, { onConflict: 'offering_id,date' })
  }

  // Remove scheduled sessions that now fall outside the date range.
  // Only 'scheduled' sessions are deleted — completed/cancelled ones are preserved.
  const startStr = format(rangeStart, 'yyyy-MM-dd')
  const endStr   = format(endDate,    'yyyy-MM-dd')
  await supabase
    .from('sessions')
    .delete()
    .eq('offering_id', offeringId)
    .eq('status', 'scheduled')
    .or(`date.lt.${startStr},date.gt.${endStr}`)
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const schema = z.object({
  offering_type:      z.enum(['course', 'workshop']),
  name:               z.string().min(1, 'Required'),
  slug:               z.string().regex(/^[a-z0-9-]*$/, 'Only lowercase letters, numbers and hyphens').optional(),
  style:              z.string(),
  level:              z.string().optional(),
  description:        z.string().optional(),
  location:           z.string().optional(),
  day_of_week:        z.string().optional(),
  start_time:         z.string().optional(),
  end_time:           z.string().optional(),
  recurrence:         z.string(),
  workshop_type:      z.string().optional(),
  start_date:         z.string().optional(),
  end_date:           z.string().optional(),
  capacity:           z.coerce.number().optional(),
  status:             z.string(),
  season:             z.string().optional(),
  default_price:      z.coerce.number(),
  monthly_pass_price: z.coerce.number(),
  notes:              z.string().optional(),
}).refine(data => {
  if (data.start_date && data.end_date && data.end_date <= data.start_date) return false
  return true
}, { message: 'End date must be after start date', path: ['end_date'] })

type F = z.infer<typeof schema>

export function OfferingForm({ offering, offeringType }: { offering?: Offering; offeringType?: OfferingType }) {
  const router = useRouter()
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(offering?.thumbnail_url ?? null)
  const [slugTouched, setSlugTouched] = useState(!!offering?.slug)
  const [multiDay, setMultiDay] = useState(!!offering?.end_date)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      offering_type:      offering?.offering_type      ?? offeringType ?? 'course',
      name:               offering?.name               ?? '',
      slug:               offering?.slug               ?? '',
      style:              offering?.style              ?? 'partnerwork',
      level:              offering?.level              ?? '',
      description:        offering?.description        ?? '',
      location:           offering?.location           ?? '',
      day_of_week:        offering?.day_of_week        ?? '',
      start_time:         offering?.start_time         ?? '',
      end_time:           offering?.end_time           ?? '',
      recurrence:         offering?.recurrence         ?? 'weekly',
      workshop_type:      offering?.workshop_type       ?? '',
      capacity:           offering?.capacity           ?? undefined,
      status:             offering?.status             ?? 'active',
      season:             offering?.season             ?? '',
      start_date:         offering?.start_date         ?? '',
      end_date:           offering?.end_date           ?? '',
      default_price:      offering?.default_price      ?? 4000,
      monthly_pass_price: offering?.monthly_pass_price ?? 15000,
      notes:              offering?.notes              ?? '',
    },
  })

  const nameValue = useWatch({ control, name: 'name' })
  const typeValue = useWatch({ control, name: 'offering_type' })
  const isCourse  = typeValue === 'course'

  useEffect(() => {
    if (!slugTouched && nameValue) {
      setValue('slug', toSlug(nameValue))
    }
  }, [nameValue, slugTouched, setValue])

  const onSubmit = async (values: F) => {
    setSubmitError(null)
    const supabase = createClient()
    const payload = {
      ...values,
      slug:          values.slug || null,
      level:         values.level || null,
      location:      values.location || null,
      day_of_week:   isCourse ? (values.day_of_week || null) : null,
      start_time:    values.start_time || null,
      end_time:      values.end_time || null,
      workshop_type: !isCourse ? (values.workshop_type || null) : null,
      season:        values.season || null,
      notes:         values.notes || null,
      start_date:    values.start_date || null,
      end_date:      multiDay ? (values.end_date || null) : null,
      thumbnail_url: thumbnailUrl,
    }

    if (offering) {
      const { error } = await supabase.from('offerings').update(payload).eq('id', offering.id)
      if (error) { setSubmitError(error.message); return }
      // Sync sessions whenever end_date is updated and still in the future
      if (isCourse) await syncSessions(supabase, offering.id, values)
      router.push(`/crm/offerings/${offering.id}`)
    } else {
      const { data, error } = await supabase.from('offerings').insert(payload).select().single()
      if (error) { setSubmitError(error.message); return }
      router.push(`/crm/offerings/${data?.id}`)
    }
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mb-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {!offering && (
            <Field label="Offering type" htmlFor="offering_type" className="sm:col-span-2">
              <Select id="offering_type" {...register('offering_type')} disabled={!!offeringType}>
                <option value="course">Course</option>
                <option value="workshop">Workshop / Event</option>
              </Select>
            </Field>
          )}

          <Field label={isCourse ? 'Course name' : 'Event name'} htmlFor="name" error={errors.name?.message} className="sm:col-span-2">
            <Input id="name" {...register('name')} />
          </Field>

          <Field label="Short URL slug" htmlFor="slug" error={errors.slug?.message} className="sm:col-span-2">
            <div className="flex items-center">
              <span className="flex h-10 items-center rounded-l-xl border border-r-0 border-white/50 bg-white/30 px-3 text-xs text-[#9A907F] whitespace-nowrap">
                /events/
              </span>
              <Input
                id="slug"
                className="rounded-l-none"
                placeholder="a1-partnerwork-monday"
                {...register('slug', { onChange: () => setSlugTouched(true) })}
              />
            </div>
            <p className="mt-1 text-xs text-[#9A907F]">Auto-generated from name · edit to customise</p>
          </Field>

          <Field label="Style" htmlFor="style">
            <Select id="style" {...register('style')}>
              {['partnerwork','caleña','fusion','other'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Level" htmlFor="level">
            <Select id="level" {...register('level')}>
              <option value="">—</option>
              {['A1','A2','B1','B2','beginner','intermediate','advanced','open'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </Select>
          </Field>

          <Field label="Recurrence" htmlFor="recurrence">
            <Select id="recurrence" {...register('recurrence')}>
              {['weekly','one-off','multi-session'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Select>
          </Field>

          {!isCourse && (
            <Field label="Workshop type" htmlFor="workshop_type">
              <Select id="workshop_type" {...register('workshop_type')}>
                <option value="">—</option>
                {['colombian-workshop','caleña-workshop','social-practice','bbq','party','guest-teacher','festival','corporate','bachelorette','wedding','show','other'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </Field>
          )}

          {isCourse && (
            <Field label="Day of week" htmlFor="day_of_week">
              <Select id="day_of_week" {...register('day_of_week')}>
                <option value="">—</option>
                {['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Select>
            </Field>
          )}

          <Field label="Location" htmlFor="location">
            <Select id="location" {...register('location')}>
              <option value="">—</option>
              <option value="BackStage Studio, Dohány u. 5b">BackStage Studio</option>
              <option value="Roxy Studio, Tátra u. 4">Roxy Studio</option>
            </Select>
          </Field>
          <Field label="Start time">
            <Controller
              control={control}
              name="start_time"
              render={({ field }) => <TimeSelect value={field.value ?? ''} onChange={field.onChange} />}
            />
          </Field>
          <Field label="End time">
            <Controller
              control={control}
              name="end_time"
              render={({ field }) => <TimeSelect value={field.value ?? ''} onChange={field.onChange} />}
            />
          </Field>
          {/* Dates */}
          <Field label="Start date" htmlFor="start_date">
            <Input id="start_date" type="date" {...register('start_date')} />
          </Field>
          <div className="flex items-center gap-3 pt-6">
            <input
              id="multi_day"
              type="checkbox"
              checked={multiDay}
              onChange={e => setMultiDay(e.target.checked)}
              className="h-4 w-4 accent-[#C9A84C]"
            />
            <label htmlFor="multi_day" className="text-sm text-[#171410]">Multiple days / has end date</label>
          </div>
          {multiDay && (
            <Field label="End date" htmlFor="end_date">
              <Input id="end_date" type="date" {...register('end_date')} />
            </Field>
          )}

          <Field label="Capacity" htmlFor="capacity">
            <Input id="capacity" type="number" {...register('capacity')} />
          </Field>
          <Field label="Status" htmlFor="status">
            <Select id="status" {...register('status')}>
              {['planned','active','paused','finished','cancelled'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </Field>
          <Field label="Default price (HUF)" htmlFor="default_price">
            <Input id="default_price" type="number" step="500" {...register('default_price')} />
          </Field>
          {isCourse && (
            <Field label="Monthly pass price (HUF)" htmlFor="monthly_pass_price">
              <Input id="monthly_pass_price" type="number" step="500" {...register('monthly_pass_price')} />
            </Field>
          )}
          <Field label="Season" htmlFor="season">
            <Input id="season" {...register('season')} />
          </Field>
          <Field label="Notes" htmlFor="notes" className="sm:col-span-2">
            <Textarea id="notes" rows={3} {...register('notes')} />
          </Field>

          <Field label="Description" htmlFor="description" className="sm:col-span-2">
            <Textarea id="description" rows={3} {...register('description')} />
          </Field>

          <Field label="Thumbnail image" className="sm:col-span-2">
            <ImageUpload value={thumbnailUrl} onChange={setThumbnailUrl} folder="offerings" />
          </Field>
        </div>
      </Card>

      {submitError && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{submitError}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : offering ? 'Save changes' : isCourse ? 'Add course' : 'Create event'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  )
}
