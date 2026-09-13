import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function PropertyEmptyState() {
  return (
    <OperatorEmptyState
      title="No properties available"
      detail="No records are currently available for this workspace."
    />
  )
}
