export async function readLockDetail(
  id: string,
  load: (
    id: string,
  ) => Promise<unknown>,
): Promise<unknown> {
  return load(id)
}
