export function dashboardCacheKey(
  id?: string,
): string {
  return id
    ? "dashboard:" + id
    : "dashboard:list"
}
