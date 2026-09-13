import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function PaymentEntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="Payments"
      id={id}
      status={status}
    />
  )
}
