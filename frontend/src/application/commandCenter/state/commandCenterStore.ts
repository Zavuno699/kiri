import type {
  CommandCenterState,
} from "../contracts/commandCenterState";

let state: CommandCenterState = {
  status: "idle",
  activeIncidentId: null,
  activeRecoveryId: null,
  criticalCount: 0,
  warningCount: 0,
  infoCount: 0,
  lastUpdatedAt: null,
};

export function getCommandCenterState(): CommandCenterState {
  return state;
}

export function setCommandCenterState(
  next: CommandCenterState,
): void {
  state = next;
}

export function updateCommandCenterState(
  patch: Partial<CommandCenterState>,
): void {
  state = {
    ...state,
    ...patch,
    lastUpdatedAt:
      new Date().toISOString(),
  };
}
