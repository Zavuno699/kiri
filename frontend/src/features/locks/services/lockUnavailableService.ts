export interface LockUnavailableService {
  list(): Promise<never>
  get(id: string): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Lock production HTTP ingress is not verified.",
  )
}

export const lockUnavailableService:
  LockUnavailableService = {
  list: async () => unavailable(),
  get: async () => unavailable(),
}
