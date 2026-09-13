export interface LockColumn {
  id: string
  label: string
  sortable?: boolean
}

export const lockColumns: LockColumn[] = [
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
