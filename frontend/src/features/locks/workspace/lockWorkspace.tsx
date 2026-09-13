import type { ReactNode } from "react"

export function LockWorkspace({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <div className="text-xs uppercase tracking-[0.18em] text-kiri-blue-400">
        Locks
      </div>
      {children}
    </div>
  )
}
