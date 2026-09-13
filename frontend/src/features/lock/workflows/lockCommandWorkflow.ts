export type LockCommandWorkflowStep =
  | "draft"
  | "validate"
  | "authorize"
  | "submit"
  | "await-result"
  | "complete"
  | "failed"

export interface LockCommandWorkflowState {
  step: LockCommandWorkflowStep
  lockId: string
  command: string
  commandId?: string
  error?: string
}
