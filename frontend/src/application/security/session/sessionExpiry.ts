
import type { OperatorSession } from "./session";

export function sessionExpired(
  session: OperatorSession | null | undefined,
  now = Date.now(),
): boolean {
  if (!session?.expiresAt) {
    return false;
  }

  const expiry = Date.parse(session.expiresAt);

  if (!Number.isFinite(expiry)) {
    return true;
  }

  return now >= expiry;
}

