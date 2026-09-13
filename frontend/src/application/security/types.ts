
export type SecurityMode =
  | "unknown"
  | "initializing"
  | "authenticated"
  | "restricted"
  | "expired"
  | "locked"
  | "signed_out";

export type AuthenticationState =
  | "unknown"
  | "authenticated"
  | "expired"
  | "rejected"
  | "signed_out";

export type AuthorizationDecision =
  | "allow"
  | "deny"
  | "challenge"
  | "expired";

export type SessionState =
  | "unknown"
  | "starting"
  | "active"
  | "idle"
  | "expiring"
  | "expired"
  | "revoked"
  | "signed_out";

