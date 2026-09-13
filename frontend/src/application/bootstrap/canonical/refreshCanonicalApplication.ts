import {
  refreshCanonicalRuntime,
} from "../../runtime/canonical/lifecycle/refreshCanonicalRuntime";

import {
  initializeFeatureRuntimes,
} from "../../featureRuntime/runtime/initializeFeatureRuntimes";

export function refreshCanonicalApplication(): void {
  initializeFeatureRuntimes();
  refreshCanonicalRuntime();
}
