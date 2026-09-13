export interface RequestHeaderContext {
  correlationId?: string
  idempotencyKey?: string
}

export function createRequestHeaders(
  context: RequestHeaderContext = {},
): Record<string, string> {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(context.correlationId
      ? {
          "X-Correlation-ID":
            context.correlationId,
        }
      : {}),
    ...(context.idempotencyKey
      ? {
          "Idempotency-Key":
            context.idempotencyKey,
        }
      : {}),
  }
}
