export function normalizeDate(
  value: unknown,
): string | undefined {
  if (typeof value !== "string") {
    return undefined
  }

  const normalized = value.trim()

  if (!normalized) {
    return undefined
  }

  const timestamp = new Date(normalized).getTime()

  return Number.isNaN(timestamp)
    ? undefined
    : new Date(timestamp).toISOString()
}
