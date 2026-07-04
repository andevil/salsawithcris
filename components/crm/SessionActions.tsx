'use client'

import { useState, useTransition } from 'react'
import { addWeeks, format, nextDay, parseISO, getDay, isBefore, isEqual } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/crm/ui'
import { CalendarPlus } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

const DOW_MAP: Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
}

export function SessionActions({ offeringId }: { offeringId: string }) {
  const [, startTransition] = useTransition()
  const [generating, setGenerating] = useState(false)
  const router = useRouter()

  const generateSessions = () => {
    startTransition(async () => {
      setGenerating(true)
      const supabase = createClient()
      const { data: offering } = await supabase
        .from('offerings')
        .select('day_of_week, start_time, end_time, location, start_date, end_date')
        .eq('id', offeringId)
        .single()

      if (!offering?.day_of_week) { setGenerating(false); return }

      const dow = DOW_MAP[offering.day_of_week]
      const rangeStart = offering.start_date ? parseISO(offering.start_date) : new Date()
      const rangeEnd   = offering.end_date   ? parseISO(offering.end_date)   : addWeeks(rangeStart, 8)

      // Find first occurrence of the target weekday on or after rangeStart
      const startDow = getDay(rangeStart)
      let current = startDow === dow ? rangeStart : nextDay(rangeStart, dow)

      const sessions = []
      while (isBefore(current, rangeEnd) || isEqual(current, rangeEnd)) {
        sessions.push({
          offering_id: offeringId,
          date:        format(current, 'yyyy-MM-dd'),
          start_time:  offering.start_time,
          end_time:    offering.end_time,
          location:    offering.location,
          status:      'scheduled',
        })
        current = addWeeks(current, 1)
      }

      if (sessions.length > 0) {
        await supabase
          .from('sessions')
          .upsert(sessions, { onConflict: 'offering_id,date' })
      }

      setGenerating(false)
      router.refresh()
    })
  }

  return (
    <Button variant="secondary" size="sm" onClick={generateSessions} disabled={generating}>
      <CalendarPlus size={14} weight="light" />
      {generating ? 'Generating…' : 'Generate sessions'}
    </Button>
  )
}
