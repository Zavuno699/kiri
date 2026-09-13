export interface PropertyPageLoader {
  load(
    query?: unknown,
  ): Promise<unknown>
}

export function createPropertyPageLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): PropertyPageLoader {
  return {
    load,
  }
}
