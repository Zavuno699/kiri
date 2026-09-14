import {
  getDegradedModeState,
} from "../../../../application/degradedMode/state/degradedModeStore";

export function securityReadsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function securityWritesAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function securityCommandsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}
