export async function readDetail<T>(
  id: string,
  load: (id: string) => Promise<T>,
): Promise<T> {
  return load(id)
}
