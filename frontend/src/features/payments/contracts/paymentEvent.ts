export interface PaymentEventPayload {
  paymentId: string
  leaseId?: string
  tenantId?: string
  amountUGX?: number
  status?: string
  reconciliationStatus?: string
  providerReference?: string
}
