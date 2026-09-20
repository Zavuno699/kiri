import { StatusPill } from "../../../components/ui/StatusPill"
import type { PropertyStatus } from "../types/property"

interface PropertyStatusProps {
  status: PropertyStatus
}

export function PropertyStatus({
  status,
}: PropertyStatusProps) {
  const map = {
    active: ["Active", "success"],
    inactive: ["Inactive", "default"],
    pending_activation: ["Pending", "warning"],
  } as const

  const [label, tone] = map[status]

  return <StatusPill label={label} tone={tone} />
}
