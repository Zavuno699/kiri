export type PaymentSettlementStep =
  | "inspect"
  | "validate"
  | "settlement"
  | "reconciliation"
  | "entitlement"
  | "complete"

export interface PaymentSettlementState {
  step: PaymentSettlementStep
  paymentId: string
  error?: string
}
