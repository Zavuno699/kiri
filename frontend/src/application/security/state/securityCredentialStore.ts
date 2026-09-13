import type {
  SecurityCredentialState,
} from "../contracts/securityCredential";

const credentials = new Map<
  string,
  SecurityCredentialState
>();

export function registerCredential(
  credential: SecurityCredentialState,
): void {
  credentials.set(
    credential.id,
    credential,
  );
}

export function getCredential(
  id: string,
): SecurityCredentialState | null {
  return credentials.get(id) ?? null;
}

export function revokeCredential(
  id: string,
): void {
  const credential =
    credentials.get(id);

  if (!credential) {
    return;
  }

  credentials.set(
    id,
    {
      ...credential,
      active: false,
      revokedAt:
        new Date().toISOString(),
    },
  );
}

export function listCredentials(): SecurityCredentialState[] {
  return [
    ...credentials.values(),
  ];
}
