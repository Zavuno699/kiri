export interface AccessCommandRequest {
  subjectId: string
  action:
    | "grant"
    | "restrict"
    | "revoke"
    | "freeze"
  propertyId?: string
  leaseId?: string
  lockId?: string
  reason: string
}
