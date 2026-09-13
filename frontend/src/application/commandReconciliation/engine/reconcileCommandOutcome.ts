import type { CommandReconciliationState } from "../commandReconciliationState";

export interface CommandOutcomeObservation {
  commandId: string;
  outcome:
    | "accepted"
    | "completed"
    | "failed"
    | "rejected";
  observedAt: string;
}

export function reconcileCommandOutcome(
  state: CommandReconciliationState,
  observation: CommandOutcomeObservation,
): CommandReconciliationState {
  if (state.commandId !== observation.commandId) {
    return {
      ...state,
      status: "drifted",
      reason: "command-id-mismatch",
    };
  }

  return {
    ...state,
    status: observation.outcome,
    observedAt: observation.observedAt,
    reason: null,
  };
}
