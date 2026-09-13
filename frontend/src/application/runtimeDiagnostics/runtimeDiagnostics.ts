import {
  getCanonicalRuntimeState,
} from "../runtime/canonical/state/canonicalRuntimeStore";

import {
  getDependencyDiagnostics,
} from "../dependencyGraph/diagnostics/dependencyDiagnostics";

import {
  listFeatureRuntimes,
} from "../featureRuntime/registry/featureRuntimeRegistry";

import {
  listCanonicalRuntimes,
} from "../runtime/canonical/registry/runtimeRegistration";

export function collectRuntimeDiagnostics() {
  return {
    canonicalRuntime:
      getCanonicalRuntimeState(),
    dependencies:
      getDependencyDiagnostics(),
    runtimes:
      listCanonicalRuntimes(),
    features:
      listFeatureRuntimes(),
  };
}
