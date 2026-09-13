export type LockInspectionStep =
  | "identity"
  | "state"
  | "readiness"
  | "telemetry"
  | "history"
  | "complete"

export interface LockInspectionContext {
  lockId: string
}

export interface LockInspectionState {
  step: LockInspectionStep
  context: LockInspectionContext
}
