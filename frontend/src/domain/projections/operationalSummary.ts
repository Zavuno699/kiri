export interface OperationalSummary {
  total: number
  active: number
  degraded: number
  unavailable: number
  lastUpdatedAt?: string
}

export function emptyOperationalSummary(): OperationalSummary {
  return {
    total: 0,
    active: 0,
    degraded: 0,
    unavailable: 0,
  }
}
