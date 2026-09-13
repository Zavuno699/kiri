import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function PaymentErrorState({
  detail = "The payments workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="Payments unavailable"
      detail={detail}
    />
  )
}
