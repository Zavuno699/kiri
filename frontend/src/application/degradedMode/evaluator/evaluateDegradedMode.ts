import type { DegradedMode } from "../degradedModeTypes";

export function evaluateDegradedMode(input: {
  consistencyStatus:
    | "unknown"
    | "consistent"
    | "warning"
    | "drifted"
    | "critical";
  securityReady: boolean;
  recoveryFailed: boolean;
}): DegradedMode {
  if (
    !input.securityReady ||
    input.recoveryFailed ||
    input.consistencyStatus === "critical"
  ) {
    return "critical";
  }

  if (
    input.consistencyStatus === "drifted"
  ) {
    return "restricted";
  }

  if (
    input.consistencyStatus === "warning" ||
    input.consistencyStatus === "unknown"
  ) {
    return "limited";
  }

  return "normal";
}
