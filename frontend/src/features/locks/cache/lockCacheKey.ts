export function lockCacheKey(
  id?: string,
): string {
  return id
    ? "locks:" + id
    : "locks:list"
}
