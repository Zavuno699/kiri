import {
  evaluateCanonicalRuntimeReadiness,
} from "../lifecycle/runtimeReadiness";

import {
  listCanonicalRuntimes,
} from "../registry/runtimeRegistration";

export function getCanonicalRuntimeDiagnostics() {
  const readiness =
    evaluateCanonicalRuntimeReadiness();

  return {
    readiness,
    runtimes:
      listCanonicalRuntimes(),
  };
}
