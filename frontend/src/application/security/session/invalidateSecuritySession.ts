import {
  getSecuritySession,
  setSecuritySession,
} from "../state/securitySessionStore";

export function invalidateSecuritySession(): void {
  const session =
    getSecuritySession();

  if (!session) {
    return;
  }

  setSecuritySession({
    ...session,
    active: false,
  });
}
