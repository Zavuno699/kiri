import { StatusPill } from "../../../components/ui/StatusPill"
import type {
  PaymentStatus,
  ReconciliationStatus,
} from "../types/payment"

interface PaymentStatusProps {
  status: PaymentStatus
}

interface ReconciliationStatusProps {
  status: ReconciliationStatus
}

export function PaymentStatus({
  status,
}: PaymentStatusProps) {
  const map = {
    pending: ["Pending", "warning"],
    processing: ["Processing", "info"],
    settled: ["Settled", "success"],
    failed: ["Failed", "danger"],
    reversed: ["Reversed", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[status]

  return <StatusPill label={label} tone={tone} />
}

export function ReconciliationStatus({
  status,
}: ReconciliationStatusProps) {
  const map = {
    pending: ["Pending", "warning"],
    matched: ["Matched", "success"],
    unmatched: ["Unmatched", "danger"],
    failed: ["Failed", "danger"],
    unknown: ["Unknown", "default"],
  } as const

  const [label, tone] = map[status]

  return <StatusPill label={label} tone={tone} />
}
