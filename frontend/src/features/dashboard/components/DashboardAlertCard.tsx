import type { DashboardAlert } from "../types/dashboardAlert"
import { SecuritySeverityPill } from "../../security/components/SecurityStatus"

export function DashboardAlertCard({
  alert,
}: {
  alert: DashboardAlert
}) {
  return (
    <article className="rounded-2xl border border-white/7 bg-kiri-900/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <SecuritySeverityPill severity={alert.severity} />

        <span className="text-[10px] text-kiri-text-muted">
          {new Date(alert.occurredAt).toLocaleString("en-UG")}
        </span>
      </div>

      <h4 className="mt-3 text-sm font-bold text-kiri-text">
        {alert.title}
      </h4>

      <p className="mt-1 text-xs leading-5 text-kiri-text-muted">
        {alert.message}
      </p>
    </article>
  )
}
