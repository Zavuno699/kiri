export interface PropertyDetailLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createPropertyDetailLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): PropertyDetailLoader {
  return {
    load,
  }
}
