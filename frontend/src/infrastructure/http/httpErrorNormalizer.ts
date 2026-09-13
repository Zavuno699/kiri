import {
  HttpApplicationError,
} from "./httpError"

export function normalizeHttpError(
  error: unknown,
): string {
  if (
    error instanceof
    HttpApplicationError
  ) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Unexpected API error."
}
