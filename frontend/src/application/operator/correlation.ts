export function ensureCorrelationId(
  value?: string,
): string {
  const normalized = value?.trim()

  if (normalized) return normalized

  return crypto.randomUUID()
}
