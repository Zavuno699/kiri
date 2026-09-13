export function paymentCacheKey(
  id?: string,
): string {
  return id
    ? "payments:" + id
    : "payments:list"
}
