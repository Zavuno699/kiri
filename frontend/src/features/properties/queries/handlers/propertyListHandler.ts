export interface PropertyListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function createPropertyListHandler(
  query: (params?: unknown) => Promise<unknown>,
): PropertyListHandler {
  return {
    execute: query,
  }
}
