export interface CredentialResponseContract {
  id: string
  subjectId: string
  leaseId?: string
  credentialType: string
  status: string
  issuedAt?: string
  expiresAt?: string
  revokedAt?: string
}
