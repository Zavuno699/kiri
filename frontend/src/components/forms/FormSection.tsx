import type { ReactNode } from "react"

export function FormSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <fieldset className="space-y-3 rounded-xl border border-white/7 p-4">
      <legend className="px-2 text-xs font-bold uppercase tracking-wider text-kiri-text-muted">
        {title}
      </legend>
      {children}
    </fieldset>
  )
}
