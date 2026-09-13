export interface PropertyOperations {
  load(propertyId: string): Promise<unknown>
  summarize(propertyId: string): Promise<unknown>
}

export function createPropertyOperations(
  load: (id: string) => Promise<unknown>,
  summarize: (id: string) => Promise<unknown>,
): PropertyOperations {
  return { load, summarize }
}
