export type LeaseLifecycleStep =
  | "inspect"
  | "validate"
  | "entitlement"
  | "payment"
  | "access"
  | "complete"

export interface LeaseLifecycleState {
  step: LeaseLifecycleStep
  leaseId: string
  error?: string
}
