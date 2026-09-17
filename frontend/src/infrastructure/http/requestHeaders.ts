export interface RequestHeaderContext {
  correlationId?: string
  idempotencyKey?: string
  authToken?: string
}

export function createRequestHeaders(
  context: RequestHeaderContext = {},
): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  if (context.correlationId) {
    headers["X-Correlation-ID"] = context.correlationId
  }

  if (context.idempotencyKey) {
    headers["Idempotency-Key"] = context.idempotencyKey
  }

  if (context.authToken) {
    headers["Authorization"] = context.authToken
  }

  return headers
}
