import type {
  SecuritySession,
} from "../contracts/securitySession";

export function createSecuritySession(
  id: string,
  principalId: string,
  ttlMs = 30 * 60 * 1000,
): SecuritySession {
  const now = Date.now();

  return {
    id,
    principalId,
    active: true,
    createdAt:
      new Date(now).toISOString(),
    expiresAt:
      new Date(
        now + ttlMs,
      ).toISOString(),
    lastActivityAt:
      new Date(now).toISOString(),
  };
}
