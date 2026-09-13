export interface PropertyStatusLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createPropertyStatusLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): PropertyStatusLoader {
  return {
    load,
  }
}
