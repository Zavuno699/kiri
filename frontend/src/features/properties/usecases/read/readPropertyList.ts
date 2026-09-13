export async function readPropertyList(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
  query?: unknown,
): Promise<unknown[]> {
  return load(query)
}
