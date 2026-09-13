export type SecurityPosture =
  | "secure"
  | "elevated"
  | "degraded"
  | "critical"
  | "unknown"

export type CredentialStatus =
  | "active"
  | "revoked"
  | "expired"
  | "suspended"
  | "unknown"

export type AccessState =
  | "granted"
  | "restricted"
  | "frozen"
  | "revoked"
  | "unknown"

export type SecurityEventSeverity =
  | "info"
  | "warning"
  | "critical"

export interface SecuritySummary {
  posture: SecurityPosture
  emergencyFreezeActive: boolean
  activeCredentials: number
  revokedCredentials: number
  restrictedAccesses: number
  criticalEvents: number
  updatedAt?: string
}

export interface SecurityCredential {
  id: string
  subjectId: string
  leaseId?: string
  credentialType: string
  status: CredentialStatus
  issuedAt?: string
  expiresAt?: string
  revokedAt?: string
}

export interface AccessRecord {
  id: string
  subjectId: string
  propertyId?: string
  lockId?: string
  leaseId?: string
  state: AccessState
  reason?: string
  updatedAt?: string
}

export interface SecurityEvent {
  id: string
  eventType: string
  severity: SecurityEventSeverity
  subjectId?: string
  propertyId?: string
  leaseId?: string
  lockId?: string
  message: string
  occurredAt: string
  correlationId?: string
}
