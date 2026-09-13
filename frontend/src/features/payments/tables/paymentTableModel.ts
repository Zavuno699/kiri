export interface PaymentTableRow {
  id: string
  status: string
  selected?: boolean
}

export interface PaymentTableModel {
  rows: PaymentTableRow[]
  total: number
}
