export interface DeviceColumn {
  id: string
  label: string
  sortable?: boolean
}

export const deviceColumns: DeviceColumn[] = [
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
