export async function readCollection<T>(
  load: () => Promise<T[]>,
): Promise<T[]> {
  return load()
}
