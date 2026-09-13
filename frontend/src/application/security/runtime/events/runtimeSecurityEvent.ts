export interface RuntimeSecurityEvent {
  type:
    | "runtime.initialized"
    | "runtime.restricted"
    | "runtime.recovered"
    | "authorization.allowed"
    | "authorization.denied"
    | "session.expiring"
    | "session.expired"
    | "policy.denied";
  occurredAt: string;
  principal: string | null;
  capability?: string;
  reason?: string;
}
