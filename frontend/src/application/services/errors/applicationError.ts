export interface ApplicationError {
  code: string
  message: string
  retryable: boolean
  details?: Record<string, unknown>
}

export function createApplicationError(
  code: string,
  message: string,
  retryable = false,
  details?: Record<string, unknown>,
): ApplicationError {
  return {
    code,
    message,
    retryable,
    details,
  }
}
