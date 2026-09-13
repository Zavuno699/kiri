export async function inspectProperty(
  id: string,
  load: (
    id: string,
  ) => Promise<unknown>,
): Promise<unknown> {
  return load(id)
}
