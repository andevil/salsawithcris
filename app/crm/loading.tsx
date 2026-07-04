import { CircleNotch } from '@phosphor-icons/react/dist/ssr'

export default function CRMLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <CircleNotch size={32} weight="light" className="animate-spin text-[#C9A84C]" />
      <p className="text-xs uppercase tracking-[0.2em] text-[#9A907F]">Loading…</p>
    </div>
  )
}
