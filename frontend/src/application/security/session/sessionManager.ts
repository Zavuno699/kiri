
import type { OperatorSession } from "./session";
import { getSessionState, setSessionState } from "./sessionStore";

export interface SessionManager {
  start(session: OperatorSession): void;
  clear(reason?: string): void;
  current(): OperatorSession | null;
}

export const sessionManager: SessionManager = {
  start(session) {
    setSessionState({
      session,
      initialized: true,
      requiresAuthentication: false,
    });
  },
  clear() {
    setSessionState({
      session: null,
      initialized: true,
      requiresAuthentication: true,
    });
  },
  current() {
    return getSessionState().session;
  },
};

