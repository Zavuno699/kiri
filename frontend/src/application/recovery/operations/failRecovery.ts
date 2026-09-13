import {
  getRecoveryState,
  setRecoveryState,
} from "../state/recoveryStore";

export function failRecovery(
  reason: string,
): void {
  const current = getRecoveryState();

  setRecoveryState({
    ...current,
    status: "failed",
    error: reason,
    lastReason: reason,
  });
}
