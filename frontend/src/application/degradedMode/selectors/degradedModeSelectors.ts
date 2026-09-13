import type { DegradedModeState } from "../state/degradedModeState";

export const selectDegradedMode = (
  state: DegradedModeState,
) => state.mode;

export const selectReadsAllowed = (
  state: DegradedModeState,
) =>
  state.mode !== "critical";

export const selectWritesAllowed = (
  state: DegradedModeState,
) =>
  state.mode === "normal" ||
  state.mode === "limited";

export const selectCommandsAllowed = (
  state: DegradedModeState,
) =>
  state.mode === "normal";

export const selectSecurityAdminAllowed = (
  state: DegradedModeState,
) =>
  state.mode === "normal";
