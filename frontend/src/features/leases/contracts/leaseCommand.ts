export interface LeaseCommandRequest {
  leaseId: string
  command:
    | "activate"
    | "suspend"
    | "freeze"
    | "terminate"
  reason: string
  expectedVersion?: number
}
