export interface PaymentViewModel {
  id: string
  reference: string
  amountLabel: string
  status: string
  reconciliation: string
  leaseId?: string
  tenantId: string
}

export function buildPaymentViewModel(
  payment: {
    id: string
    reference: string
    amountUGX: number
    currency: string
    status: string
    reconciliationStatus: string
    leaseId?: string
    tenantId: string
  },
): PaymentViewModel {
  // Use app default locale instead of hardcoded en-UG
  const locale = 'en-US' // Would come from app config in production
  
  return {
    id: payment.id,
    reference: payment.reference,
    amountLabel:
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: payment.currency,
        maximumFractionDigits: 0,
      }).format(payment.amountUGX),
    status: payment.status,
    reconciliation:
      payment.reconciliationStatus,
    leaseId: payment.leaseId,
    tenantId: payment.tenantId,
  }
}
