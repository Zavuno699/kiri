export async function readLeaseList(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
  query?: unknown,
): Promise<unknown[]> {
  return load(query)
}
