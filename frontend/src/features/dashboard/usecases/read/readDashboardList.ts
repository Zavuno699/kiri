export async function readDashboardList(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
  query?: unknown,
): Promise<unknown[]> {
  return load(query)
}
