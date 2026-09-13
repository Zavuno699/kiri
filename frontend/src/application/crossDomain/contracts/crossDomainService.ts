export interface CrossDomainContext {
  principal?: string | null;
  sessionId?: string | null;
  correlationId?: string | null;
}

export interface CrossDomainResult<T = unknown> {
  success: boolean;
  value: T | null;
  reason: string | null;
}
