export interface AccessReviewContext {
  subjectId: string
  propertyId?: string
  leaseId?: string
  lockId?: string
}

export type AccessReviewStep =
  | "inspect"
  | "validate"
  | "authorize"
  | "complete"

export interface AccessReviewState {
  step: AccessReviewStep
  context: AccessReviewContext
}

export function createAccessReviewState(
  context: AccessReviewContext,
): AccessReviewState {
  return {
    step: "inspect",
    context,
  }
}
