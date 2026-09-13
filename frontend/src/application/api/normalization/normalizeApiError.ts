import type {
  CanonicalApiError,
} from "../contracts/apiError";

export function normalizeApiError(
  status: number,
  body: unknown,
  requestId: string | null,
): CanonicalApiError {
  let message =
    `API request failed with status ${status}`;

  if (
    body &&
    typeof body ===
      "object" &&
    "message" in body
  ) {
    const candidate =
      (
        body as {
          message?: unknown;
        }
      ).message;

    if (
      typeof candidate ===
      "string"
    ) {
      message =
        candidate;
    }
  }

  return {
    code:
      status === 401
        ? "API_UNAUTHORIZED"
        : status === 403
          ? "API_FORBIDDEN"
          : status === 404
            ? "API_NOT_FOUND"
            : status === 409
              ? "API_CONFLICT"
              : status >= 500
                ? "API_SERVER_ERROR"
                : "API_REQUEST_FAILED",
    message,
    status,
    requestId,
    retryable:
      status >= 500 ||
      status === 429,
  };
}
