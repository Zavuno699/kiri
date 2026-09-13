import {
  getSecuritySession,
  setSecuritySession,
} from "../state/securitySessionStore";

export function touchSecuritySession(): void {
  const session =
    getSecuritySession();

  if (!session) {
    return;
  }

  setSecuritySession({
    ...session,
    lastActivityAt:
      new Date().toISOString(),
  });
}
