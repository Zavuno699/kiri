export type SecurityReviewStep =
  | "posture"
  | "credentials"
  | "access"
  | "events"
  | "response"
  | "complete"

export interface SecurityReviewContext {
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
}

export interface SecurityReviewState {
  step: SecurityReviewStep
  context: SecurityReviewContext
}
