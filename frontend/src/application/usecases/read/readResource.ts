export async function readResource<T>(
  load: () => Promise<T>,
): Promise<T> {
  return load()
}
