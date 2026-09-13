import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function LeaseErrorState({
  detail = "The leases workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="Leases unavailable"
      detail={detail}
    />
  )
}
