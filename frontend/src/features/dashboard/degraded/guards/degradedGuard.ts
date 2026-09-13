import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function dashboardReadsAvailable(): boolean {
  return getDegradedModeState().mode !== "critical";
}

export function dashboardWritesAvailable(): boolean {
  const mode =
    getDegradedModeState().mode;

  return mode === "normal" ||
    mode === "limited";
}

export function dashboardCommandsAvailable(): boolean {
  return getDegradedModeState().mode === "normal";
}
