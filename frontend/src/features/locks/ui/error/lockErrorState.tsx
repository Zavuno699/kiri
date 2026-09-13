import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function LockErrorState({
  detail = "The locks workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="Locks unavailable"
      detail={detail}
    />
  )
}
