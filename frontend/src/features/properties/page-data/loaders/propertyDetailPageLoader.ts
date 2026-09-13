export interface PropertyDetailPageLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createPropertyDetailPageLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): PropertyDetailPageLoader {
  return {
    load,
  }
}
