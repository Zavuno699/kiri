export function deviceCacheKey(
  id?: string,
): string {
  return id
    ? "devices:" + id
    : "devices:list"
}
