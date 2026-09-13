import type { ReactNode } from "react"

export function DomainSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold text-kiri-text">
        {title}
      </h2>
      {children}
    </section>
  )
}
