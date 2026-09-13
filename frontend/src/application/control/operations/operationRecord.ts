export interface OperationRecord {
  id: string
  type: string
  status: string
  createdAt: string
  updatedAt: string
  correlationId?: string
  resourceType?: string
  resourceId?: string
  error?: string
  metadata?: Record<string, unknown>
}
