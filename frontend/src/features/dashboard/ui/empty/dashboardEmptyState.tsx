import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function DashboardEmptyState() {
  return (
    <OperatorEmptyState
      title="No dashboard available"
      detail="No records are currently available for this workspace."
    />
  )
}
