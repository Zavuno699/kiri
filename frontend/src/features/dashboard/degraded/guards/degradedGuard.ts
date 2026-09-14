import {
  getDegradedModeState,
} from "../../../../application/degradedMode/state/degradedModeStore";

export function dashboardReadsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function dashboardWritesAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function dashboardCommandsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}
