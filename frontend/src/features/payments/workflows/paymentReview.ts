export type PaymentReviewStep =
  | "inspect"
  | "validate"
  | "settlement"
  | "reconciliation"
  | "entitlement"
  | "complete"

export interface PaymentReviewContext {
  paymentId: string
}

export interface PaymentReviewState {
  step: PaymentReviewStep
  context: PaymentReviewContext
}
