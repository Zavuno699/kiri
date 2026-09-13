export interface DashboardOperatorModel {
  id?: string
  title: string
  domain: "dashboard"
  status: string
  degraded: boolean
  readOnly: boolean
}
