import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function PaymentEmptyState() {
  return (
    <OperatorEmptyState
      title="No payments available"
      detail="No records are currently available for this workspace."
    />
  )
}
