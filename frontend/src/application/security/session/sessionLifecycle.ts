
import { sessionManager } from "./sessionManager";
import type { OperatorSession } from "./session";

export function beginSession(session: OperatorSession): void {
  sessionManager.start(session);
}

export function endSession(): void {
  sessionManager.clear("operator-signed-out");
}

