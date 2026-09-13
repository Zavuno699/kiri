export interface PropertyTableRow {
  id: string
  status: string
  selected?: boolean
}

export interface PropertyTableModel {
  rows: PropertyTableRow[]
  total: number
}
