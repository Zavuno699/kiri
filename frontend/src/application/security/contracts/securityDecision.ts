export type SecurityDecision =
  | "allow"
  | "deny"
  | "challenge"
  | "freeze";

export interface AuthorizationDecision {
  decision: SecurityDecision;
  capability: string;
  principal: string | null;
  reason: string;
  evaluatedAt: string;
}
