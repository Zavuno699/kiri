
import type { CredentialMetadata } from "./credentialMetadata";

export function revokeCredential(
  credential: CredentialMetadata,
  revokedAt = new Date().toISOString(),
): CredentialMetadata {
  return {
    ...credential,
    status: "revoked",
    revokedAt,
  };
}

