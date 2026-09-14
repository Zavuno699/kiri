export interface OperationRecord {
  id: string
  domain: string
  type: string
  status: string
  state?: string
  progress?: number
  createdAt: string
  updatedAt: string
  correlationId?: string
  resourceType?: string
  resourceId?: string
  subjectId?: string
  error?: string
  metadata?: Record<string, unknown>
}
