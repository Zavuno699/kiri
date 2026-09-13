import type {
  OperationalHealth,
  OperationalSeverity,
} from "../../features/dashboard/types/dashboard"

interface OperationalStatusProps {
  label: string
  status: OperationalHealth | OperationalSeverity
}

const classes: Record<string, string> = {
  healthy:
    "border-kiri-green/20 bg-kiri-green/[0.07] text-kiri-green",
  success:
    "border-kiri-green/20 bg-kiri-green/[0.07] text-kiri-green",
  degraded:
    "border-kiri-amber/20 bg-kiri-amber/[0.07] text-kiri-amber",
  warning:
    "border-kiri-amber/20 bg-kiri-amber/[0.07] text-kiri-amber",
  critical:
    "border-kiri-red/20 bg-kiri-red/[0.07] text-kiri-red",
  danger:
    "border-kiri-red/20 bg-kiri-red/[0.07] text-kiri-red",
  unknown:
    "border-white/10 bg-white/[0.025] text-kiri-text-muted",
  info:
    "border-kiri-blue-500/20 bg-kiri-blue-500/[0.07] text-kiri-blue-400",
}

const labels: Record<string, string> = {
  healthy: "Healthy",
  success: "Success",
  degraded: "Degraded",
  warning: "Warning",
  critical: "Critical",
  danger: "Critical",
  unknown: "Unknown",
  info: "Info",
}

export function OperationalStatus({
  label,
  status,
}: OperationalStatusProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-kiri-text-soft">{label}</span>

      <span
        className={[
          "inline-flex items-center gap-2 rounded-full border px-2.5 py-1",
          "text-[10px] font-bold uppercase tracking-[0.12em]",
          classes[status],
        ].join(" ")}
      >
        <span className="size-1.5 rounded-full bg-current" />
        {labels[status]}
      </span>
    </div>
  )
}
