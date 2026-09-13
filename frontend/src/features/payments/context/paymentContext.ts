export interface PaymentContext {
  domain: "payments"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function createPaymentContext(
  entityId?: string,
): PaymentContext {
  return {
    domain: "payments",
    entityId,
    readOnly: true,
  }
}
