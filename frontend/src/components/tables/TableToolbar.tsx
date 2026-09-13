import type { ReactNode } from "react"

export function TableToolbar({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-white/7 pb-3">
      {children}
    </div>
  )
}
