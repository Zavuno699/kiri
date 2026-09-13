import type { ReactNode } from "react"

export function ActionCard({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/7 bg-kiri-900/60 p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-black">
            {title}
          </h3>

          <p className="mt-1 max-w-xl text-xs leading-5 text-kiri-text-muted">
            {description}
          </p>
        </div>

        {action ? (
          <div className="shrink-0">
            {action}
          </div>
        ) : null}
      </div>
    </section>
  )
}
