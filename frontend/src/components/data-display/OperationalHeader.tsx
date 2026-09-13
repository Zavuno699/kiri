import type { ReactNode } from "react"

interface OperationalHeaderProps {
  eyebrow: string
  title: string
  description: string
  status?: ReactNode
}

export function OperationalHeader({
  eyebrow,
  title,
  description,
  status,
}: OperationalHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
          {eyebrow}
        </div>

        <h1 className="mt-2 text-3xl font-black tracking-tight">
          {title}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
          {description}
        </p>
      </div>

      {status ? (
        <div className="shrink-0">
          {status}
        </div>
      ) : null}
    </div>
  )
}
