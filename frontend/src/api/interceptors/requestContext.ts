export function buildRequestHeaders(
  correlationId?: string,
): Record<string, string> {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(correlationId
      ? { "X-Correlation-ID": correlationId }
      : {}),
  }
}
