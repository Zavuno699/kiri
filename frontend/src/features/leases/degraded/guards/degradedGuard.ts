import {
  getDegradedModeState,
} from "../../../../application/degradedMode/state/degradedModeStore";

export function leasesReadsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function leasesWritesAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}

export function leasesCommandsAvailable(): boolean {
  const state = getDegradedModeState();
  return !state.active;
}
