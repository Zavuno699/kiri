
export interface SecurityEvent {
  id: string;
  type:
    | "authentication.succeeded"
    | "authentication.failed"
    | "authorization.denied"
    | "session.expiring"
    | "session.expired"
    | "session.revoked"
    | "credential.invalid"
    | "policy.denied"
    | "security.freeze";
  occurredAt: string;
  principal: string | null;
  correlationId?: string;
  metadata?: Record<string, unknown>;
}

