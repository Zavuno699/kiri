export interface LeaseAccessRelationship {
  leaseId: string
  subjectId?: string
  propertyId?: string
  lockId?: string
  accessState:
    | "granted"
    | "restricted"
    | "frozen"
    | "revoked"
    | "unknown"
}
