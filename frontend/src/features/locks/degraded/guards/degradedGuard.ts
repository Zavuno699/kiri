import {
  getDegradedModeState,
} from "../../../../application/degradedMode/state/degradedModeStore";

export function locksReadsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function locksWritesAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function locksCommandsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}
