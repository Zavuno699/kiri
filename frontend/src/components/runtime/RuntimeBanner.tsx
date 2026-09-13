import type { ReactNode } from "react"

export function RuntimeBanner({
  tone,
  children,
}: {
  tone: "info" | "warning" | "danger"
  children: ReactNode
}) {
  const classes = {
    info: "border-kiri-blue-500/15 bg-kiri-blue-500/[0.04] text-kiri-blue-400",
    warning: "border-kiri-amber/15 bg-kiri-amber/[0.04] text-kiri-amber",
    danger: "border-kiri-red/15 bg-kiri-red/[0.04] text-kiri-red",
  }

  return (
    <div
      className={[
        "rounded-xl border px-4 py-3 text-xs",
        classes[tone],
      ].join(" ")}
    >
      {children}
    </div>
  )
}
