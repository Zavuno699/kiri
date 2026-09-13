import type { ReactNode } from "react"

export function OperationalActionStrip({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/7 bg-kiri-950/40 p-3">
      {children}
    </div>
  )
}
