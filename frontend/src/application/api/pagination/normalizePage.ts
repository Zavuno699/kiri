export function normalizePage(
  page?: number,
): number {
  return Math.max(1, page ?? 1)
}
