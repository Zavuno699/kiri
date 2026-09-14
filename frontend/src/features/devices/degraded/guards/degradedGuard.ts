import {
  getDegradedModeState,
} from "../../../../application/degradedMode/state/degradedModeStore";

export function devicesReadsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function devicesWritesAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function devicesCommandsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}
