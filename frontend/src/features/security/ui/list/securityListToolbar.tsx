import type { ReactNode } from "react"

export function SecurityListToolbar({
  children,
}: {
  children?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-xs font-semibold text-kiri-text">
        Security
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  )
}
