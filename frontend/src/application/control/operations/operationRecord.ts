export interface OperationRecord {
  id: string
  type: string
  status: "pending" | "running" | "completed" | "failed" | "cancelled"
  createdAt: string
  updatedAt: string
  correlationId?: string
  resourceType?: string
  resourceId?: string
  error?: string
  metadata?: Record<string, unknown>
}
