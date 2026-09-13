export class ApiError extends Error {
  readonly status: number
  readonly code?: string
  readonly correlationId?: string

  constructor(
    message: string,
    status: number,
    code?: string,
    correlationId?: string,
  ) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.correlationId = correlationId
  }
}
