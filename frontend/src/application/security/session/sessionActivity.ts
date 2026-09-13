
import type { OperatorSession } from "./session";

export function touchSession(
  session: OperatorSession,
  occurredAt = new Date().toISOString(),
): OperatorSession {
  return {
    ...session,
    lastActivityAt: occurredAt,
  };
}

