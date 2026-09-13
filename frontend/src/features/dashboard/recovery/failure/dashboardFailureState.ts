export interface DashboardFailureState {
  failed: boolean
  code?: string
  message?: string
  retryable: boolean
}
