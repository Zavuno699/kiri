export interface AuditCorrelationContext {
  correlationId: string;
  causationId: string | null;
  parentId: string | null;
}

let current: AuditCorrelationContext = {
  correlationId: crypto.randomUUID(),
  causationId: null,
  parentId: null,
};

export function getAuditCorrelationContext(): AuditCorrelationContext {
  return current;
}

export function beginAuditCorrelation(
  causationId?: string | null,
): AuditCorrelationContext {
  current = {
    correlationId: crypto.randomUUID(),
    causationId: causationId ?? null,
    parentId: current.correlationId,
  };

  return current;
}
