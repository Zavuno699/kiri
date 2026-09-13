import type { DashboardApiRecord } from "../../contracts/dashboardApiRecord"

export interface DashboardDetailResponse {
  data: DashboardApiRecord
  correlationId?: string
}
