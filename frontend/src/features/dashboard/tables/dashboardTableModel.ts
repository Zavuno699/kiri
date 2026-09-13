export interface DashboardTableRow {
  id: string
  status: string
  selected?: boolean
}

export interface DashboardTableModel {
  rows: DashboardTableRow[]
  total: number
}
