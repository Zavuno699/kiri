export function normalizeStatus(
  value: unknown,
): string {
  if (typeof value !== "string") {
    return "unknown"
  }

  const normalized = value
    .trim()
    .toLowerCase()

  return normalized || "unknown"
}
