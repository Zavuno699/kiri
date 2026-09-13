export interface SecurityColumn {
  id: string
  label: string
  sortable?: boolean
}

export const securityColumns: SecurityColumn[] = [
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
