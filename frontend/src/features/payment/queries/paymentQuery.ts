export interface PaymentQuery {
  search?: string
  tenantId?: string
  leaseId?: string
  status?: string
  reconciliationStatus?: string
  provider?: string
}
