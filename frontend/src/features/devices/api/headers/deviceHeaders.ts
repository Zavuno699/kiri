export function deviceHeaders(
  correlationId?: string,
): Record<string, string> {
  return {
    Accept: "application/json",
    ...(correlationId
      ? {
          "X-Correlation-ID": correlationId,
        }
      : {}),
  }
}
