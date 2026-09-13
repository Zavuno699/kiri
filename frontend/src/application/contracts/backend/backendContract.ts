import type { BackendCapability } from "./backendCapability"

export interface BackendContract {
  service: string
  capabilities: BackendCapability[]
}
