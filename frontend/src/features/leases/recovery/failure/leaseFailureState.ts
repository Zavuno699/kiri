export interface LeaseFailureState {
  failed: boolean
  code?: string
  message?: string
  retryable: boolean
}
