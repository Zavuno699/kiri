export interface LeaseTableRow {
  id: string
  status: string
  selected?: boolean
}

export interface LeaseTableModel {
  rows: LeaseTableRow[]
  total: number
}
