export async function refreshDevice(
  refresh: () => Promise<unknown>,
): Promise<unknown> {
  return refresh()
}
