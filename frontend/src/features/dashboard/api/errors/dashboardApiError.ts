export interface DashboardApiError {
  status: number
  code?: string
  message: string
  correlationId?: string
}
