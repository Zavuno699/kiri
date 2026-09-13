export interface SecurityUnavailableService {
  list(): Promise<never>
  get(id: string): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Security production HTTP ingress is not verified.",
  )
}

export const securityUnavailableService:
  SecurityUnavailableService = {
  list: async () => unavailable(),
  get: async () => unavailable(),
}
