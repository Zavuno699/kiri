import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function LockEntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="Locks"
      id={id}
      status={status}
    />
  )
}
