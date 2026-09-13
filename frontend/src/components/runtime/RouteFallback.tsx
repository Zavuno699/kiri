import type { ReactNode } from "react"

interface RouteFallbackProps {
  title?: string
  message?: string
  action?: ReactNode
}

export function RouteFallback({
  title = "Workspace unavailable",
  message = "The requested workspace could not be rendered.",
  action,
}: RouteFallbackProps) {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-3xl items-center justify-center px-6">
      <div className="kiri-panel w-full rounded-3xl p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-kiri-red/20 bg-kiri-red/[0.05] text-kiri-red">
          !
        </div>

        <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-text-muted">
          Runtime boundary
        </div>

        <h2 className="mt-2 text-2xl font-black text-kiri-text">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-kiri-text-muted">
          {message}
        </p>

        {action ? (
          <div className="mt-6">
            {action}
          </div>
        ) : null}
      </div>
    </section>
  )
}
