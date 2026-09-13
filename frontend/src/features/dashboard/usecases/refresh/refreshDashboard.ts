export async function refreshDashboard(
  refresh: () => Promise<unknown>,
): Promise<unknown> {
  return refresh()
}
