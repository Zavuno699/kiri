export interface SecurityCredentialState {
  id: string;
  type:
    | "session"
    | "token"
    | "operator-code"
    | "device-code"
    | "unknown";
  active: boolean;
  issuedAt: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
}
