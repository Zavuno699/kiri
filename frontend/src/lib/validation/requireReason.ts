export function requireReason(
  reason: string,
): string {
  const normalized = reason.trim()

  if (!normalized) {
    throw new Error("An operational reason is required.")
  }

  return normalized
}
