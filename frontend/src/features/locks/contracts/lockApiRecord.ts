export interface LockApiRecord {
  id: string
  status?: string
  version?: number
  updatedAt?: string
  metadata?: Record<string, unknown>
}
