export async function inspectSecurity(
  id: string,
  load: (
    id: string,
  ) => Promise<unknown>,
): Promise<unknown> {
  return load(id)
}
