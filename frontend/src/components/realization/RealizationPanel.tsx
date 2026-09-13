import type { ReactNode } from "react"

export function RealizationPanel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="mb-4">
        <div className="text-sm font-bold text-kiri-text">
          {title}
        </div>

        {description ? (
          <div className="mt-1 text-xs text-kiri-text-muted">
            {description}
          </div>
        ) : null}
      </div>

      {children}
    </section>
  )
}
