
import type { CredentialMetadata } from "./credentialMetadata";

export function credentialUsable(
  credential: CredentialMetadata | null | undefined,
  now = Date.now(),
): boolean {
  if (!credential || credential.status !== "active") {
    return false;
  }

  if (!credential.expiresAt) {
    return true;
  }

  return Date.parse(credential.expiresAt) > now;
}

