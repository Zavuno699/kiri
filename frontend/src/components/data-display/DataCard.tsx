import type { ReactNode } from "react"

interface DataCardProps {
  children: ReactNode
  className?: string
}

export function DataCard({
  children,
  className = "",
}: DataCardProps) {
  return (
    <section
      className={[
        "kiri-panel rounded-3xl p-5",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  )
}
