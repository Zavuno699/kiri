import type { ReactNode } from "react"

export function LeaseWorkspaceLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <header>
        <div className="text-[10px] uppercase tracking-[0.18em] text-kiri-blue-400">
          Leases
        </div>
        <h1 className="mt-1 text-2xl font-black text-kiri-text">
          Leases workspace
        </h1>
      </header>
      {children}
    </div>
  )
}
