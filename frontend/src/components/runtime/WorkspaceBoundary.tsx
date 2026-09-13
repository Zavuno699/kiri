import type { ReactNode } from "react"

interface WorkspaceBoundaryProps {
  children: ReactNode
}

export function WorkspaceBoundary({
  children,
}: WorkspaceBoundaryProps) {
  return (
    <div className="min-h-full w-full">
      {children}
    </div>
  )
}
