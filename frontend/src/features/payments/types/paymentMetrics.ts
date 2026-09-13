export interface PaymentMetrics {
  count: number
  settled: number
  pending: number
  failed: number
  reconciled: number
  unmatched: number
  settledValueUGX: number
}
