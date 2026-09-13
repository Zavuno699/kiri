export interface OperationalPayment {
  id: string
  leaseId?: string
  propertyId?: string
  amount?: number
  currency?: string
  status?: string
  reference?: string
  settledAt?: string
  metadata?: Record<string, unknown>
}
