import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function locksReadsAvailable(): boolean {
  return getDegradedModeState().mode !== "critical";
}

export function locksWritesAvailable(): boolean {
  const mode =
    getDegradedModeState().mode;

  return mode === "normal" ||
    mode === "limited";
}

export function locksCommandsAvailable(): boolean {
  return getDegradedModeState().mode === "normal";
}
