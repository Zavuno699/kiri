import type { ReactNode } from "react"

export function CommandSurface({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/60 p-4">
      <div className="mb-3 text-sm font-bold text-kiri-text">
        {title}
      </div>
      {children}
    </section>
  )
}
