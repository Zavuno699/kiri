import type { ReactNode } from "react"

export function TimelineItem({
  title,
  detail,
  timestamp,
  meta,
  children,
}: {
  title: string
  detail?: string
  timestamp?: string
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <article className="relative rounded-2xl border border-white/7 bg-kiri-900/60 p-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <div>
          <div className="text-sm font-semibold text-kiri-text">
            {title}
          </div>

          {detail ? (
            <div className="mt-1 text-xs leading-5 text-kiri-text-muted">
              {detail}
            </div>
          ) : null}
        </div>

        {timestamp ? (
          <div className="shrink-0 text-[10px] text-kiri-text-muted">
            {timestamp}
          </div>
        ) : null}
      </div>

      {meta ? (
        <div className="mt-3">
          {meta}
        </div>
      ) : null}

      {children ? (
        <div className="mt-3">
          {children}
        </div>
      ) : null}
    </article>
  )
}
