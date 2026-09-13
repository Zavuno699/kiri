import type {
  ApiErrorShape,
} from "../../types/api/apiError"

export class HttpApplicationError extends Error {
  readonly status: number
  readonly code?: string
  readonly correlationId?: string
  readonly details?: unknown

  constructor(
    message: string,
    status: number,
    payload?: ApiErrorShape,
  ) {
    super(message)

    this.name =
      "HttpApplicationError"
    this.status = status
    this.code = payload?.code
    this.correlationId =
      payload?.correlationId
    this.details = payload?.details
  }
}
