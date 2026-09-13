export interface DashboardSortModel {
  field: string
  direction: "asc" | "desc"
}

export const defaultDashboardSort:
  DashboardSortModel = {
  field: "id",
  direction: "asc",
}
