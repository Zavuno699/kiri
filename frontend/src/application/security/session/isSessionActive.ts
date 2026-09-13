import {
  getSecuritySession,
} from "../state/securitySessionStore";

export function isSecuritySessionActive(): boolean {
  const session =
    getSecuritySession();

  if (!session || !session.active) {
    return false;
  }

  if (
    session.expiresAt &&
    Date.now() >=
      new Date(
        session.expiresAt,
      ).getTime()
  ) {
    return false;
  }

  return true;
}
