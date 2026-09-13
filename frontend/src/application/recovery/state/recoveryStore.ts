import type { RecoveryState } from "./recoveryState";

let state: RecoveryState = {
  status: "idle",
  activeScope: null,
  activeResourceId: null,
  attempts: 0,
  lastAttemptAt: null,
  lastCompletedAt: null,
  lastReason: null,
  error: null,
};

export function getRecoveryState(): RecoveryState {
  return state;
}

export function setRecoveryState(
  next: RecoveryState,
): void {
  state = next;
}
