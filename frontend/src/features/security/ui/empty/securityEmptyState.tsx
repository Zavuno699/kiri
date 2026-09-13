import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function SecurityEmptyState() {
  return (
    <OperatorEmptyState
      title="No security available"
      detail="No records are currently available for this workspace."
    />
  )
}
