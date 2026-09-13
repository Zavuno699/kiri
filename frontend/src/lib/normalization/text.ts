export function normalizeText(
  value?: string | null,
): string {
  return value?.trim() ?? ""
}

export function nullableText(
  value?: string | null,
): string | undefined {
  const normalized = normalizeText(value)
  return normalized || undefined
}
