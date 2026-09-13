export interface OperationalSecurity {
  id: string
  subjectId?: string
  status?: string
  accessGranted?: boolean
  restrictedAccess?: number
  credentialState?: string
  lastEventAt?: string
  metadata?: Record<string, unknown>
}
