export interface PropertyDetailsHandler {
  execute(id: string): Promise<unknown>
}

export function createPropertyDetailsHandler(
  query: (id: string) => Promise<unknown>,
): PropertyDetailsHandler {
  return {
    execute: query,
  }
}
