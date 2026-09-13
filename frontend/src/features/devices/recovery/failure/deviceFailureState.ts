export interface DeviceFailureState {
  failed: boolean
  code?: string
  message?: string
  retryable: boolean
}
