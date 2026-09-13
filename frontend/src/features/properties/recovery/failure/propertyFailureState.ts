export interface PropertyFailureState {
  failed: boolean
  code?: string
  message?: string
  retryable: boolean
}
