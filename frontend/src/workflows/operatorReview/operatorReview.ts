export type OperatorReviewDomain =
  | "property"
  | "lease"
  | "payment"
  | "device"
  | "lock"
  | "security"

export type OperatorReviewStep =
  | "identify"
  | "inspect"
  | "validate"
  | "authorize"
  | "act"
  | "observe"
  | "complete"

export interface OperatorReviewContext {
  domain: OperatorReviewDomain
  entityId: string
}

export interface OperatorReviewState {
  step: OperatorReviewStep
  context: OperatorReviewContext
}
