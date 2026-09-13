export interface SessionRevocationState {
  revoked: boolean;
  revokedAt: string | null;
  reason: string | null;
}
