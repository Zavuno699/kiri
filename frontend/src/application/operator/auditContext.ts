export interface AuditContext {
  correlationId: string
  operatorId?: string
  reason: string
  entityType: string
  entityId: string
}

export function createAuditContext(
  input: AuditContext,
): AuditContext {
  return {
    ...input,
    reason: input.reason.trim(),
  }
}
