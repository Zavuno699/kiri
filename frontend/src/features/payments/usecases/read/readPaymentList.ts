export async function readPaymentList(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
  query?: unknown,
): Promise<unknown[]> {
  return load(query)
}
