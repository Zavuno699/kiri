import type { ReactNode } from "react"

export function DomainToolbar({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/7 bg-kiri-950/50 p-3">
      {children}
    </div>
  )
}
