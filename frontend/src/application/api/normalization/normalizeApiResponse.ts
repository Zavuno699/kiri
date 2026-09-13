import type {
  CanonicalApiResponse,
} from "../contracts/apiResponse";

export function normalizeApiResponse<T>(
  status: number,
  body: unknown,
  requestId: string | null,
): CanonicalApiResponse<T> {
  return {
    success:
      status >= 200 &&
      status < 300,
    status,
    data:
      status >= 200 &&
      status < 300
        ? (body as T)
        : null,
    error:
      status >= 200 &&
      status < 300
        ? null
        : (
            body &&
            typeof body ===
              "object" &&
            "message" in body
          )
            ? String(
                (
                  body as {
                    message: unknown;
                  }
                ).message,
              )
            : `Request failed: ${status}`,
    requestId,
  };
}
