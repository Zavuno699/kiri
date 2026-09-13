export async function refreshLock(
  refresh: () => Promise<unknown>,
): Promise<unknown> {
  return refresh()
}
