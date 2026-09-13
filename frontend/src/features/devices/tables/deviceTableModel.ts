export interface DeviceTableRow {
  id: string
  status: string
  selected?: boolean
}

export interface DeviceTableModel {
  rows: DeviceTableRow[]
  total: number
}
