import type { ReactNode } from "react"

export function DomainWorkspaceGrid({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      {children}
    </div>
  )
}
