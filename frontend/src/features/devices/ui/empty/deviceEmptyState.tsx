import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function DeviceEmptyState() {
  return (
    <OperatorEmptyState
      title="No devices available"
      detail="No records are currently available for this workspace."
    />
  )
}
