export interface PaymentColumn {
  id: string
  label: string
  sortable?: boolean
}

export const paymentColumns: PaymentColumn[] = [
  {
    id: "id",
    label: "ID",
    sortable: true,
  },
  {
    id: "status",
    label: "Status",
    sortable: true,
  },
]
