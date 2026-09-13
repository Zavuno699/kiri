import {
  listCredentials,
  revokeCredential,
} from "../state/securityCredentialStore";

export function revokeAllActiveCredentials(): number {
  let count = 0;

  for (
    const credential of listCredentials()
  ) {
    if (credential.active) {
      revokeCredential(
        credential.id,
      );
      count += 1;
    }
  }

  return count;
}
