interface StatusPillProps {
  label: string
  tone?: "default" | "success" | "warning" | "danger" | "info"
}

const tones = {
  default: "border-white/10 bg-white/[0.025] text-kiri-text-soft",
  success:
    "border-kiri-green/20 bg-kiri-green/[0.07] text-kiri-green",
  warning:
    "border-kiri-amber/20 bg-kiri-amber/[0.07] text-kiri-amber",
  danger:
    "border-kiri-red/20 bg-kiri-red/[0.07] text-kiri-red",
  info:
    "border-kiri-blue-500/20 bg-kiri-blue-500/[0.07] text-kiri-blue-400",
}

export function StatusPill({
  label,
  tone = "default",
}: StatusPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        tones[tone],
      ].join(" ")}
    >
      {label}
    </span>
  )
}
