import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function securityReadsAvailable(): boolean {
  return getDegradedModeState().mode !== "critical";
}

export function securityWritesAvailable(): boolean {
  const mode =
    getDegradedModeState().mode;

  return mode === "normal" ||
    mode === "limited";
}

export function securityCommandsAvailable(): boolean {
  return getDegradedModeState().mode === "normal";
}
