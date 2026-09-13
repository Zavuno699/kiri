import type { ReactNode } from "react"

export function OperatorDetailShell({
  title,
  header,
  children,
}: {
  title: string
  header?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-lg font-black text-kiri-text">
          {title}
        </h2>
        {header}
      </div>

      <div className="rounded-2xl border border-white/7 bg-kiri-950/55 p-5">
        {children}
      </div>
    </section>
  )
}
