export interface LeaseColumn {
  id: string
  label: string
  sortable?: boolean
}

export const leaseColumns: LeaseColumn[] = [
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
