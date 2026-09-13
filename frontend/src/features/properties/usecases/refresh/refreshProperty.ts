export async function refreshProperty(
  refresh: () => Promise<unknown>,
): Promise<unknown> {
  return refresh()
}
