import {
  getRecoveryState,
} from "../state/recoveryStore";

export function recoveryInProgress(): boolean {
  return getRecoveryState().status === "recovering";
}

export function recoveryDegraded(): boolean {
  return getRecoveryState().status === "degraded";
}

export function recoveryFailed(): boolean {
  return getRecoveryState().status === "failed";
}
