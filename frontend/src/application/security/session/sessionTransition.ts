
import type { SessionState } from "../types";
import type { OperatorSession } from "./session";

export function transitionSession(
  session: OperatorSession,
  next: SessionState,
): OperatorSession {
  return {
    ...session,
    state: next,
  };
}

