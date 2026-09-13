export async function refreshPayment(
  refresh: () => Promise<unknown>,
): Promise<unknown> {
  return refresh()
}
