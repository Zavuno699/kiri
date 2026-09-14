import { StatusPill } from "../../../components/ui/StatusPill"
import type { LeaseStatus } from "../types/lease"

interface LeaseStatusProps {
  status: LeaseStatus
}

export function LeaseStatus({
  status,
}: LeaseStatusProps) {
  const map = {
    active: ["Active", "success"],
    grace_period: ["Grace period", "warning"],
    locked: ["Locked", "danger"],
    unknown: ["Unknown", "default"],
    pending: ["Pending", "info"],
    expired: ["Expired", "danger"],
    delinquent: ["Delinquent", "danger"],
    frozen: ["Frozen", "danger"],
  } as const

  const [label, tone] = map[status]

  return <StatusPill label={label} tone={tone} />
}
