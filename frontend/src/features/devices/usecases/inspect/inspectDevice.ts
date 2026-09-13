export async function inspectDevice(
  id: string,
  load: (
    id: string,
  ) => Promise<unknown>,
): Promise<unknown> {
  return load(id)
}
