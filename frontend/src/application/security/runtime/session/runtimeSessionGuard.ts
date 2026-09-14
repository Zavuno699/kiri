import { sessionExpired } from "../../session/sessionExpiry";
import { getSecurityRuntimeState } from "../securityRuntimeStore";
import type { SessionState } from "../../types";

export function runtimeSessionActive(): boolean {
  const state = getSecurityRuntimeState();
  const session = state.session.session;

  if (!session) {
    return false;
  }

  const operatorSession = {
    id: session.id,
    state: "active" as SessionState,
    startedAt: null,
    lastActivityAt: null,
    expiresAt: null,
    idleTimeoutSeconds: null,
    authenticatedAt: null,
    revokedAt: null,
  };

  return !sessionExpired(operatorSession);
}
