import {
  getCanonicalRuntimeState,
  setCanonicalRuntimeState,
} from "../state/canonicalRuntimeStore";

export function stopCanonicalRuntime(): void {
  setCanonicalRuntimeState({
    ...getCanonicalRuntimeState(),
    status: "stopped",
    lastRefreshAt:
      new Date().toISOString(),
  });
}
