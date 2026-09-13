export interface PaymentReconciliationContext {
  paymentId: string
  leaseId?: string
  currentStatus: string
}

export type PaymentReconciliationStep =
  | "inspect"
  | "match"
  | "confirm"
  | "complete"

export interface PaymentReconciliationState {
  step: PaymentReconciliationStep
  context: PaymentReconciliationContext
}

export function createPaymentReconciliationState(
  context: PaymentReconciliationContext,
): PaymentReconciliationState {
  return {
    step: "inspect",
    context,
  }
}
