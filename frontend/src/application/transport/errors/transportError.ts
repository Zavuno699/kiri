export class TransportError extends Error {
  readonly status?: number
  readonly retryable: boolean

  constructor(
    message: string,
    status?: number,
    retryable = false,
  ) {
    super(message)
    this.name = "TransportError"
    this.status = status
    this.retryable = retryable
  }
}
