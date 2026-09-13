import type { ReactNode } from "react"

export function DomainWorkspacePanel({
  className = "",
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={`rounded-2xl border border-white/7 bg-kiri-950/60 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </section>
  )
}
