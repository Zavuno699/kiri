import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function PropertyErrorState({
  detail = "The properties workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="Properties unavailable"
      detail={detail}
    />
  )
}
