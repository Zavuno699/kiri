export interface SecurityFailureState {
  failed: boolean
  code?: string
  message?: string
  retryable: boolean
}
