export function leaseCacheKey(
  id?: string,
): string {
  return id
    ? "leases:" + id
    : "leases:list"
}
