import type { ReactNode } from "react"

export function DomainWorkspace({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-black text-kiri-text">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-kiri-text-muted">
            {subtitle}
          </p>
        ) : null}
      </header>

      {children}
    </div>
  )
}
