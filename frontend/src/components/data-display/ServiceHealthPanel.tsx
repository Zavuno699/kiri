import type { DashboardHealth } from "../../features/dashboard/types/dashboard"
import { OperationalStatus } from "../operations/OperationalStatus"

interface ServiceHealthPanelProps {
  health: DashboardHealth
}

export function ServiceHealthPanel({
  health,
}: ServiceHealthPanelProps) {
  return (
    <section className="kiri-panel rounded-3xl p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
        Runtime health
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">Service condition</h3>

        <OperationalStatus
          label=""
          status={health.overall}
        />
      </div>

      <div className="mt-5 space-y-4">
        <OperationalStatus label="API gateway" status={health.api} />
        <OperationalStatus label="Database" status={health.database} />
        <OperationalStatus label="Messaging" status={health.messaging} />
        <OperationalStatus label="Devices" status={health.devices} />
      </div>
    </section>
  )
}
