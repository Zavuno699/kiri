import type { ReactNode } from "react"

export function LockActionPanel({
  children,
}: {
  children?: ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Locks actions
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {children}
      </div>
    </section>
  )
}
