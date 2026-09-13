export type HttpErrorCode =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "unprocessable_entity"
  | "rate_limited"
  | "unavailable"
  | "internal_error"
  | "unknown"

export interface HttpErrorContract {
  code: HttpErrorCode
  message: string
  status: number
  correlationId?: string
  details?: unknown
}
