'use client'

import { useEffect } from 'react'
import { Card, Button } from '@/components/crm/ui'
import { WarningCircle, ArrowClockwise } from '@phosphor-icons/react'

export default function CRMError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <WarningCircle size={40} weight="light" className="text-[#C9A84C]" />
        </div>
        <h1 className="font-display text-2xl font-light text-[#171410]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[#9A907F]">
          This page hit a snag loading your data.
        </p>
        {error.message && (
          <p className="mt-3 border border-[#E2DDD5] bg-white/50 px-3 py-2 text-xs text-[#6B6155]">
            {error.message}
          </p>
        )}
        <div className="mt-6 flex justify-center">
          <Button variant="secondary" size="sm" onClick={() => reset()}>
            <ArrowClockwise size={14} weight="light" /> Try again
          </Button>
        </div>
      </Card>
    </div>
  )
}
