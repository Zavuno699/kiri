import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function propertiesReadsAvailable(): boolean {
  return getDegradedModeState().mode !== "critical";
}

export function propertiesWritesAvailable(): boolean {
  const mode =
    getDegradedModeState().mode;

  return mode === "normal" ||
    mode === "limited";
}

export function propertiesCommandsAvailable(): boolean {
  return getDegradedModeState().mode === "normal";
}
