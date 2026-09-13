export interface SecurityFacade {
  summary(): Promise<never>
  credentials(): Promise<never>
  access(): Promise<never>
  events(): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Security HTTP ingress is not verified in the production backend.",
  )
}

export function createSecurityFacade(): SecurityFacade {
  return {
    summary: async () => unavailable(),
    credentials: async () => unavailable(),
    access: async () => unavailable(),
    events: async () => unavailable(),
  }
}
