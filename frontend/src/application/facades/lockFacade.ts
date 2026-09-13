export interface LockFacade {
  list(): Promise<never>
  get(id: string): Promise<never>
  command(input: unknown): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Lock HTTP ingress is not verified in the production backend.",
  )
}

export function createLockFacade(): LockFacade {
  return {
    list: async () => unavailable(),
    get: async () => unavailable(),
    command: async () => unavailable(),
  }
}
