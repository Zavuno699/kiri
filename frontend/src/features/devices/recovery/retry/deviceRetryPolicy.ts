export interface DeviceRetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const deviceRetryPolicy: DeviceRetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
