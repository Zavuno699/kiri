export type ProviderStatus =
  | "available"
  | "degraded"
  | "unavailable"
  | "unknown"

export interface ProviderStatusContract {
  provider: string
  status: ProviderStatus
  checkedAt?: string
  detail?: string
}
