export type LeaseReviewStep =
  | "identity"
  | "entitlement"
  | "payment"
  | "access"
  | "complete"

export interface LeaseReviewContext {
  leaseId: string
}

export interface LeaseReviewState {
  step: LeaseReviewStep
  context: LeaseReviewContext
}
