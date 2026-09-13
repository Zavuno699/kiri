export async function refreshSecurity(
  refresh: () => Promise<unknown>,
): Promise<unknown> {
  return refresh()
}
