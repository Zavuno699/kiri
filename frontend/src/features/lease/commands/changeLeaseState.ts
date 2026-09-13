export type LeaseStateCommand =
  | "activate"
  | "suspend"
  | "freeze"
  | "terminate"

export interface ChangeLeaseStateCommand {
  leaseId: string
  command: LeaseStateCommand
  reason: string
  expectedVersion?: number
}
