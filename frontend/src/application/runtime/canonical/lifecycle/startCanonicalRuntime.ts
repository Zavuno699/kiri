import {
  registerAllCanonicalRuntimes,
} from "../registry/registerCanonicalRuntimes";

import {
  markCanonicalRuntimeInitialized,
} from "../registry/runtimeRegistration";

import {
  evaluateCanonicalRuntimeReadiness,
} from "./runtimeReadiness";

import {
  getCanonicalRuntimeState,
  setCanonicalRuntimeState,
} from "../state/canonicalRuntimeStore";

export function startCanonicalRuntime(): void {
  registerAllCanonicalRuntimes();

  const state =
    getCanonicalRuntimeState();

  setCanonicalRuntimeState({
    ...state,
    initialized: true,
    status: "starting",
    startedAt:
      state.startedAt ??
      new Date().toISOString(),
    lastRefreshAt:
      new Date().toISOString(),
  });

  const builtIns = [
    "security",
    "rbac",
    "navigation",
    "actions",
    "dataflow",
    "workflows",
    "audit",
    "health",
  ];

  for (const key of builtIns) {
    markCanonicalRuntimeInitialized(key);
  }

  const readiness =
    evaluateCanonicalRuntimeReadiness();

  setCanonicalRuntimeState({
    ...getCanonicalRuntimeState(),
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
