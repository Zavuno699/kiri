export type LockCommandReviewStep =
  | "draft"
  | "validate"
  | "authorize"
  | "submit"
  | "await-result"
  | "complete"

export interface LockCommandReviewContext {
  lockId: string
  command: string
  reason: string
}

export interface LockCommandReviewState {
  step: LockCommandReviewStep
  context: LockCommandReviewContext
}
