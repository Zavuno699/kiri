export interface PropertyColumn {
  id: string
  label: string
  sortable?: boolean
}

export const propertyColumns: PropertyColumn[] = [
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
