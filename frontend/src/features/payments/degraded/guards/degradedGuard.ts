import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function paymentsReadsAvailable(): boolean {
  return getDegradedModeState().mode !== "critical";
}

export function paymentsWritesAvailable(): boolean {
  const mode =
    getDegradedModeState().mode;

  return mode === "normal" ||
    mode === "limited";
}

export function paymentsCommandsAvailable(): boolean {
  return getDegradedModeState().mode === "normal";
}
