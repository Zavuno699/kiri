export interface PaymentDetail {
  id: string
  reference: string
  amountUGX: number
  currency: string
  status: string
  reconciliationStatus: string
  provider?: string
  providerReference?: string
  tenantId: string
  leaseId?: string
  createdAt?: string
  settledAt?: string
}
