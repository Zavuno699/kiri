import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function LeaseEmptyState() {
  return (
    <OperatorEmptyState
      title="No leases available"
      detail="No records are currently available for this workspace."
    />
  )
}
