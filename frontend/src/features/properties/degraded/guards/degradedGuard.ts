import {
  getDegradedModeState,
} from "../../../../application/degradedMode/state/degradedModeStore";

export function propertiesReadsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function propertiesWritesAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function propertiesCommandsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}
