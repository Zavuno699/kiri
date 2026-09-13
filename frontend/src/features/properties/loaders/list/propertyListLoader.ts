export interface PropertyListLoader {
  load(
    query?: unknown,
  ): Promise<unknown[]>
}

export function createPropertyListLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
): PropertyListLoader {
  return {
    load,
  }
}
