export interface LockTableRow {
  id: string
  status: string
  selected?: boolean
}

export interface LockTableModel {
  rows: LockTableRow[]
  total: number
}
