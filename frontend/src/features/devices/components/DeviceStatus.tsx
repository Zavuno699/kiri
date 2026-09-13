import { StatusPill } from "../../../components/ui/StatusPill"
import type {
  DeviceConnectionStatus,
  DeviceHealthStatus,
} from "../types/device"

export function DeviceConnectionStatusPill({
  status,
}: {
  status: DeviceConnectionStatus
}) {
  const map = {
    online: ["Online", "success"],
    offline: ["Offline", "danger"],
    degraded: ["Degraded", "warning"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[status]

  return <StatusPill label={label} tone={tone} />
}

export function DeviceHealthStatusPill({
  status,
}: {
  status: DeviceHealthStatus
}) {
  const map = {
    healthy: ["Healthy", "success"],
    warning: ["Warning", "warning"],
    critical: ["Critical", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[status]

  return <StatusPill label={label} tone={tone} />
}
