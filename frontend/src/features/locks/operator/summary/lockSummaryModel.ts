export interface LockSummaryModel {
  total: number
  healthy: number
  degraded: number
  failed: number
  updatedAt: string
}

export function emptyLockSummary():
  LockSummaryModel {
  return {
    total: 0,
    healthy: 0,
    degraded: 0,
    failed: 0,
    updatedAt: new Date().toISOString(),
  }
}
