import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function leasesReadsAvailable(): boolean {
  return getDegradedModeState().mode !== "critical";
}

export function leasesWritesAvailable(): boolean {
  const mode =
    getDegradedModeState().mode;

  return mode === "normal" ||
    mode === "limited";
}

export function leasesCommandsAvailable(): boolean {
  return getDegradedModeState().mode === "normal";
}
