import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function PropertyEntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="Properties"
      id={id}
      status={status}
    />
  )
}
