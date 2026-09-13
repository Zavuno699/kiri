export function resourceKey(
  domain: string,
  id?: string,
): string {
  return id
    ? `${domain}:${id}`
    : `${domain}:list`
}
