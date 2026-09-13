
export interface CredentialMetadata {
  id: string;
  kind: "session" | "api" | "device" | "temporary";
  status: "active" | "expired" | "revoked" | "unknown";
  issuedAt: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
  ownerPrincipal: string | null;
}

