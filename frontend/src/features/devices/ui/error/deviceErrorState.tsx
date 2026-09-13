import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function DeviceErrorState({
  detail = "The devices workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="Devices unavailable"
      detail={detail}
    />
  )
}
