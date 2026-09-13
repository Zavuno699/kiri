import type { ReactNode } from "react"

export function LeaseDetailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <div className="xl:col-span-8">
        {children}
      </div>
    </div>
  )
}
