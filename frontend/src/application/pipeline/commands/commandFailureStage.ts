export interface CommandFailure {
  commandId: string
  code: string
  message: string
  retryable: boolean
  occurredAt: string
}

export function createCommandFailure(
  commandId: string,
  code: string,
  message: string,
  retryable = false,
): CommandFailure {
  return {
    commandId,
    code,
    message,
    retryable,
    occurredAt: new Date().toISOString(),
  }
}
