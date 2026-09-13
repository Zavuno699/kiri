import type { DashboardApiRecord } from "../../contracts/dashboardApiRecord"

export interface DashboardListResponse {
  items: DashboardApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}
