export async function refreshResource<T>(
  refresh: () => Promise<T>,
): Promise<T> {
  return refresh()
}
