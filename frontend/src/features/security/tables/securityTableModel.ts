export interface SecurityTableRow {
  id: string
  status: string
  selected?: boolean
}

export interface SecurityTableModel {
  rows: SecurityTableRow[]
  total: number
}
