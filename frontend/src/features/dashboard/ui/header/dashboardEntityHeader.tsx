import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function DashboardEntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="Dashboard"
      id={id}
      status={status}
    />
  )
}
