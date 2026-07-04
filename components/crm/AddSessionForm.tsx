'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Field, Input, Button } from '@/components/crm/ui'
import { TimeSelect } from '@/components/crm/TimeSelect'
import { Plus } from '@phosphor-icons/react'

export function AddSessionForm({ offeringId }: { offeringId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [topic, setTopic] = useState('')

  const reset = () => {
    setDate('')
    setStartTime('')
    setEndTime('')
    setLocation('')
    setTopic('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) { setError('Date is required'); return }
    setError(null)
    setSaving(true)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('sessions').insert({
      offering_id: offeringId,
      date,
      start_time:  startTime || null,
      end_time:    endTime   || null,
      location:    location  || null,
      topic:       topic     || null,
      status:      'scheduled',
    })

    setSaving(false)
    if (insertError) { setError(insertError.message); return }

    reset()
    setOpen(false)
    router.refresh()
  }

  if (!open) {
    return (
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <Plus size={14} weight="light" /> Add session
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 gap-3 border border-[#E2DDD5] p-4 sm:grid-cols-2">
      <Field label="Date" htmlFor="session_date">
        <Input id="session_date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </Field>
      <Field label="Location" htmlFor="session_location">
        <Input id="session_location" value={location} onChange={e => setLocation(e.target.value)} />
      </Field>
      <Field label="Start time">
        <TimeSelect value={startTime} onChange={setStartTime} />
      </Field>
      <Field label="End time">
        <TimeSelect value={endTime} onChange={setEndTime} />
      </Field>
      <Field label="Topic" htmlFor="session_topic" className="sm:col-span-2">
        <Input id="session_topic" value={topic} onChange={e => setTopic(e.target.value)} />
      </Field>

      {error && <p className="sm:col-span-2 text-xs text-red-500">{error}</p>}

      <div className="flex gap-2 sm:col-span-2">
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? 'Saving…' : 'Save session'}
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={() => { setOpen(false); reset(); setError(null) }}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
