export interface ApplicationSuccess<T> {
  ok: true
  data: T
}

export interface ApplicationFailure {
  ok: false
  code: string
  message: string
}

export type ApplicationResult<T> =
  | ApplicationSuccess<T>
  | ApplicationFailure

export function success<T>(
  data: T,
): ApplicationSuccess<T> {
  return {
    ok: true,
    data,
  }
}

export function failure(
  code: string,
  message: string,
): ApplicationFailure {
  return {
    ok: false,
    code,
    message,
  }
}
