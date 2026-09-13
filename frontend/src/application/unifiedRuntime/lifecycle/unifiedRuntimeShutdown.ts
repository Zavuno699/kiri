import {
  getUnifiedRuntimeState,
  setUnifiedRuntimeState,
} from "../state/unifiedRuntimeStore";

export function shutdownUnifiedRuntime(): void {
  const state =
    getUnifiedRuntimeState();

  setUnifiedRuntimeState({
    ...state,
    status: "stopped",
    operatorReady: false,
    lastRefreshAt:
      new Date().toISOString(),
  });
}
