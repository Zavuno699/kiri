export async function readSecurityDetail(
  id: string,
  load: (
    id: string,
  ) => Promise<unknown>,
): Promise<unknown> {
  return load(id)
}
