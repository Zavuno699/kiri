import type { CommandReconciliationState } from "../commandReconciliationState";

export const selectCommandTerminal = (
  state: CommandReconciliationState,
): boolean =>
  state.status === "completed" ||
  state.status === "failed" ||
  state.status === "rejected";

export const selectCommandDrifted = (
  state: CommandReconciliationState,
): boolean =>
  state.status === "drifted" ||
  state.status === "timeout";
