export interface ServiceError {
  code: string
  message: string
  cause?: unknown
}

export function toServiceError(
  error: unknown,
): ServiceError {
  return {
    code: "SERVICE_ERROR",
    message:
      error instanceof Error
        ? error.message
        : String(error),
    cause: error,
  }
}
