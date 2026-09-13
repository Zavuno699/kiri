import {
  registerFeatureRuntimes,
} from "../registry/registerFeatureRuntimes";

import {
  listFeatureRuntimes,
  markFeatureRuntimeInitialized,
} from "../registry/featureRuntimeRegistry";

export function initializeFeatureRuntimes(): void {
  registerFeatureRuntimes();

  for (const feature of listFeatureRuntimes()) {
    markFeatureRuntimeInitialized(
      feature.domain,
    );
  }
}
