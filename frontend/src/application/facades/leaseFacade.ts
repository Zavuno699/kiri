export interface LeaseFacade {
  list(filters?: unknown): Promise<unknown>
  get(id: string): Promise<unknown>
}

export function createLeaseFacade(
  list: (filters?: unknown) => Promise<unknown>,
  get: (id: string) => Promise<unknown>,
): LeaseFacade {
  return { list, get }
}
