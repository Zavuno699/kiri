import {
  evaluateCanonicalRuntimeReadiness,
} from "./runtimeReadiness";

import {
  getCanonicalRuntimeState,
  setCanonicalRuntimeState,
} from "../state/canonicalRuntimeStore";

export function refreshCanonicalRuntime(): void {
  const readiness =
    evaluateCanonicalRuntimeReadiness();

  const current =
    getCanonicalRuntimeState();

  setCanonicalRuntimeState({
    ...current,
    status:
      readiness.ready
        ? "ready"
        : "degraded",
    reasons:
      readiness.missing,
    lastRefreshAt:
      new Date().toISOString(),
  });
}
