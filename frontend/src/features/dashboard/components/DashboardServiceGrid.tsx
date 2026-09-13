import type { DashboardServiceStatus } from "../types/dashboardService"
import { StatusPill } from "../../../components/ui/StatusPill"

export function DashboardServiceGrid({
  services,
}: {
  services: DashboardServiceStatus[]
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => {
        const tone =
          service.status === "healthy"
            ? "success"
            : service.status === "degraded"
              ? "warning"
              : service.status === "offline"
                ? "danger"
                : "default"

        return (
          <div
            key={service.name}
            className="rounded-2xl border border-white/7 bg-kiri-900/60 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">
                {service.name}
              </span>

              <StatusPill
                label={service.status}
                tone={tone}
              />
            </div>

            <div className="mt-3 text-xs text-kiri-text-muted">
              {service.detail ?? "No additional diagnostic detail"}
            </div>

            {service.latencyMs != null ? (
              <div className="mt-2 font-mono text-[10px] text-kiri-blue-400">
                {service.latencyMs} ms
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
