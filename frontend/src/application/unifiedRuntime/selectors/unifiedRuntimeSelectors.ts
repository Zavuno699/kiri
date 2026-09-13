import type {
  UnifiedRuntimeState,
} from "../state/unifiedRuntimeState";

export const selectUnifiedRuntimeReady = (
  state: UnifiedRuntimeState,
) => state.status === "ready";

export const selectUnifiedRuntimeDegraded = (
  state: UnifiedRuntimeState,
) =>
  state.status === "limited" ||
  state.status === "restricted";

export const selectUnifiedRuntimeFailed = (
  state: UnifiedRuntimeState,
) => state.status === "failed";

export const selectUnifiedOperatorReady = (
  state: UnifiedRuntimeState,
) => state.operatorReady;

export const selectUnifiedRuntimeReasons = (
  state: UnifiedRuntimeState,
) => state.reasons;
