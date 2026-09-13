export interface DashboardFilterForm {
  search: string
  status: string
}

export const emptyDashboardFilterForm: DashboardFilterForm = {
  search: "",
  status: "",
}
