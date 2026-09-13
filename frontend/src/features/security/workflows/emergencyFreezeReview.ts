export type EmergencyFreezeReviewStep =
  | "inspect"
  | "authorize"
  | "freeze"
  | "revoke"
  | "observe"
  | "release"
  | "complete"

export interface EmergencyFreezeReviewContext {
  propertyId?: string
  leaseId?: string
  reason: string
}

export interface EmergencyFreezeReviewState {
  step: EmergencyFreezeReviewStep
  context: EmergencyFreezeReviewContext
}
