import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function devicesReadsAvailable(): boolean {
  return getDegradedModeState().mode !== "critical";
}

export function devicesWritesAvailable(): boolean {
  const mode =
    getDegradedModeState().mode;

  return mode === "normal" ||
    mode === "limited";
}

export function devicesCommandsAvailable(): boolean {
  return getDegradedModeState().mode === "normal";
}
