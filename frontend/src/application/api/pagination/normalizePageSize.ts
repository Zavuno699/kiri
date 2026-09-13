export function normalizePageSize(
  pageSize?: number,
): number {
  return Math.max(
    1,
    Math.min(250, pageSize ?? 25),
  )
}
