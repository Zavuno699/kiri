export interface SecurityAuditQuery {
  subjectId?: string
  severity?: "info" | "warning" | "critical"
  limit?: number
}
