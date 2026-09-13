export interface RealizationResult<T> {
  ok: boolean
  value?: T
  message?: string
  correlationId?: string
}

export function success<T>(
  value: T,
  correlationId?: string,
): RealizationResult<T> {
  return {
    ok: true,
    value,
    correlationId,
  }
}

export function failure<T = never>(
  message: string,
  correlationId?: string,
): RealizationResult<T> {
  return {
    ok: false,
    message,
    correlationId,
  }
}
