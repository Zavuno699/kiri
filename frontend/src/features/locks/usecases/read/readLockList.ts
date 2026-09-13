export async function readLockList(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
  query?: unknown,
): Promise<unknown[]> {
  return load(query)
}
