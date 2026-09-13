import type { ReactNode } from "react"

interface FieldLabelProps {
  label: string
  children: ReactNode
}

export function FieldLabel({
  label,
  children,
}: FieldLabelProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-kiri-text-muted">
        {label}
      </span>

      {children}
    </label>
  )
}
