import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function LockEmptyState() {
  return (
    <OperatorEmptyState
      title="No locks available"
      detail="No records are currently available for this workspace."
    />
  )
}
