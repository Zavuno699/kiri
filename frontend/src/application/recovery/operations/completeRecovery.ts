import {
  getRecoveryState,
  setRecoveryState,
} from "../state/recoveryStore";

export function completeRecovery(
  recovered: boolean,
  reason: string,
): void {
  const current = getRecoveryState();

  setRecoveryState({
    ...current,
    status: recovered ? "recovered" : "degraded",
    lastCompletedAt: new Date().toISOString(),
    lastReason: reason,
    error: recovered ? null : reason,
  });
}
