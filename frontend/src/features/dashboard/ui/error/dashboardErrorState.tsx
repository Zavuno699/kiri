import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function DashboardErrorState({
  detail = "The dashboard workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="Dashboard unavailable"
      detail={detail}
    />
  )
}
