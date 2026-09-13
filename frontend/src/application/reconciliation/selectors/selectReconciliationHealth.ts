export interface ReconciliationHealth {
  healthy: boolean
  pending: number
  failed: number
}

export function selectReconciliationHealth(): ReconciliationHealth {
  return {
    healthy: true,
    pending: 0,
    failed: 0,
  }
}
