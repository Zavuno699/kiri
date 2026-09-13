import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function LeaseEntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="Leases"
      id={id}
      status={status}
    />
  )
}
