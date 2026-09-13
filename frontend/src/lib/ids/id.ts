export function normalizeId(value: string): string {
  return value.trim()
}

export function hasId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  )
}
