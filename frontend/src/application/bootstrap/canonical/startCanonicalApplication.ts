import {
  startUnifiedFrontendRuntime,
} from "./startUnifiedRuntime";

import {
  initializeCanonicalApplicationGraph,
} from "../../canonicalGraph/canonicalApplicationGraph";

import {
  registerCoreDependencies,
} from "../../dependencyGraph/runtime/registerCoreDependencies";

import {
  registerUnifiedRuntimeSubsystems,
} from "../../unifiedRuntime/registry/registerRuntimeSubsystems";

import {
  initializeFeatureRuntimes,
} from "../../featureRuntime/runtime/initializeFeatureRuntimes";

import {
  startCanonicalRuntime,
} from "../../runtime/canonical/lifecycle/startCanonicalRuntime";

export function startCanonicalApplication(): void {
  registerCoreDependencies();
  registerUnifiedRuntimeSubsystems();

  initializeCanonicalApplicationGraph();
  initializeFeatureRuntimes();

  startCanonicalRuntime();

  startUnifiedFrontendRuntime();
}