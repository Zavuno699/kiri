export async function refreshLease(
  refresh: () => Promise<unknown>,
): Promise<unknown> {
  return refresh()
}
