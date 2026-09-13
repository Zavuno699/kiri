import type { RecoveryRequest } from "../recoveryRequest";
import {
  getRecoveryState,
  setRecoveryState,
} from "../state/recoveryStore";

export function startRecovery(
  request: RecoveryRequest,
): void {
  const current = getRecoveryState();

  setRecoveryState({
    ...current,
    status: "recovering",
    activeScope: request.scope,
    activeResourceId:
      request.resourceId ?? null,
    attempts: current.attempts + 1,
    lastAttemptAt: new Date().toISOString(),
    lastReason: request.reason,
    error: null,
  });
}
