export function buildQuery(
  values: Record<string, unknown>,
): string {
  const entries = Object.entries(values)
    .filter(([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "",
    )

  if (entries.length === 0) return ""

  const params = new URLSearchParams()

  for (const [key, value] of entries) {
    params.set(key, String(value))
  }

  return `?${params.toString()}`
}
