import Link from 'next/link'
import { Card, Button } from '@/components/crm/ui'
import { ArrowLeft, UserCircleMinus } from '@phosphor-icons/react/dist/ssr'

export default function PersonNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <UserCircleMinus size={40} weight="light" className="text-[#C9A84C]" />
        </div>
        <h1 className="font-display text-2xl font-light text-[#171410]">Person not found</h1>
        <p className="mt-2 text-sm text-[#9A907F]">
          This contact doesn&rsquo;t exist, or may have been deleted.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/crm/people">
            <Button variant="secondary" size="sm">
              <ArrowLeft size={14} weight="light" /> Back to People
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
