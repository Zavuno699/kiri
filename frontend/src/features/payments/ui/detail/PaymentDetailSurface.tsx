import { PaymentDetailFields } from "./paymentDetailFields"

export function PaymentDetailSurface({
  id,
  amount,
  currency,
  status,
  reference,
}: {
  id: string
  amount: string
  currency: string
  status: string
  reference: string
}) {
  return (
    <PaymentDetailFields
      fields={[
        { id: "id", label: "Payment", value: id },
        { id: "amount", label: "Amount", value: amount },
        {
          id: "currency",
          label: "Currency",
          value: currency,
        },
        { id: "status", label: "Status", value: status },
        {
          id: "reference",
          label: "Reference",
          value: reference,
        },
      ]}
    />
  )
}
