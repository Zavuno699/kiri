export type EmergencyFreezeWorkflowStep =
  | "inspect"
  | "authorize"
  | "freeze"
  | "revoke"
  | "observe"
  | "complete"
  | "failed"

export interface EmergencyFreezeWorkflowState {
  step: EmergencyFreezeWorkflowStep
  propertyId?: string
  leaseId?: string
  error?: string
}
