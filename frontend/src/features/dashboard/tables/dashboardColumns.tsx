export interface DashboardColumn {
  id: string
  label: string
  sortable?: boolean
}

export const dashboardColumns: DashboardColumn[] = [
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
