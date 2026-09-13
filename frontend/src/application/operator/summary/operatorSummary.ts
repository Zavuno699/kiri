export interface OperatorSummary {
  total: number
  healthy: number
  degraded: number
  blocked: number
  failed: number
  updatedAt: string
}

export function emptyOperatorSummary(): OperatorSummary {
  return {
    total: 0,
    healthy: 0,
    degraded: 0,
    blocked: 0,
    failed: 0,
    updatedAt: new Date().toISOString(),
  }
}
