export interface PropertyFacade {
  list(filters?: unknown): Promise<unknown>
  get(id: string): Promise<unknown>
}

export function createPropertyFacade(
  list: (filters?: unknown) => Promise<unknown>,
  get: (id: string) => Promise<unknown>,
): PropertyFacade {
  return { list, get }
}
