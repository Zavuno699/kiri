export interface ProviderContract {
  name: string
  enabled: boolean
  description: string
}

export const providerContracts: ProviderContract[] = [
  {
    name: "API",
    enabled: true,
    description: "HTTP API boundary",
  },
  {
    name: "Session",
    enabled: false,
    description: "Authentication/session integration",
  },
  {
    name: "Notifications",
    enabled: false,
    description: "Operational notification integration",
  },
]
