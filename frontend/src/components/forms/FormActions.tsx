import type { ReactNode } from "react"

export function FormActions({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex justify-end gap-2 border-t border-white/7 pt-4">
      {children}
    </div>
  )
}
