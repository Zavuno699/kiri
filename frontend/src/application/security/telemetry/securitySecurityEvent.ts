export interface SecuritySecurityEvent {
  type:
    | "authorization.denied"
    | "authorization.allowed"
    | "security.frozen"
    | "security.recovered"
    | "credential.revoked"
    | "session.invalidated";
  occurredAt: string;
  principalId: string | null;
  reason: string | null;
}
