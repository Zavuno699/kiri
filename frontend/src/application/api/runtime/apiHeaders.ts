export function buildApiHeaders(
  additional?: Record<string, string>,
): Record<string, string> {
  return {
    Accept:
      "application/json",
    "Content-Type":
      "application/json",
    ...additional,
  };
}
