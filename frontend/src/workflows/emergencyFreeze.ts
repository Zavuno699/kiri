export type EmergencyFreezeStep =
  | "inspect"
  | "authorize"
  | "freeze"
  | "revoke"
  | "observe"
  | "complete"

export interface EmergencyFreezeContext {
  propertyId?: string
  leaseId?: string
  reason: string
}

export interface EmergencyFreezeState {
  step: EmergencyFreezeStep
  context: EmergencyFreezeContext
}
