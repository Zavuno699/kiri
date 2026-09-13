export interface SuccessResult<T> {
  ok: true
  data: T
}

export interface FailureResult {
  ok: false
  error: string
  code?: string
}

export type Result<T> =
  | SuccessResult<T>
  | FailureResult
