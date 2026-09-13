import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function SecurityErrorState({
  detail = "The security workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="Security unavailable"
      detail={detail}
    />
  )
}
