import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function SecurityEntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="Security"
      id={id}
      status={status}
    />
  )
}
