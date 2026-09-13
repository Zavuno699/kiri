export interface CommandRetryState {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const defaultCommandRetryState:
  CommandRetryState = {
  attempts: 0,
  maxAttempts: 3,
  retryable: true,
  exhausted: false,
}
