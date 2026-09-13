export function securityCacheKey(
  id?: string,
): string {
  return id
    ? "security:" + id
    : "security:list"
}
