import {
  getDegradedModeState,
} from "../../../../application/degradedMode/state/degradedModeStore";

export function paymentsReadsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function paymentsWritesAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function paymentsCommandsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}
