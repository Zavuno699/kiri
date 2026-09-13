export function OperatorBadge({
  label,
  tone = "neutral",
}: {
  label: string
  tone?: "neutral" | "info" | "success" | "warning" | "danger"
}) {
  const classes = {
    neutral: "border-white/8 bg-white/[0.03] text-kiri-text-muted",
    info: "border-kiri-blue-500/20 bg-kiri-blue-500/[0.06] text-kiri-blue-400",
    success: "border-kiri-green/20 bg-kiri-green/[0.05] text-kiri-green",
    warning: "border-kiri-amber/20 bg-kiri-amber/[0.05] text-kiri-amber",
    danger: "border-kiri-red/20 bg-kiri-red/[0.05] text-kiri-red",
  }

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em]",
        classes[tone],
      ].join(" ")}
    >
      {label}
    </span>
  )
}
