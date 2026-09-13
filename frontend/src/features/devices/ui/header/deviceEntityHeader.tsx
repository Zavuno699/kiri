import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function DeviceEntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="Devices"
      id={id}
      status={status}
    />
  )
}
