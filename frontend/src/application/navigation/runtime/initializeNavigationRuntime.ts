import {
  registerCanonicalNavigation,
} from "../canonical/registerCanonicalNavigation";

import {
  registerCanonicalRouteMetadata,
} from "../canonical/registerCanonicalRouteMetadata";

import {
  syncRouteRuntime,
} from "./syncRouteRuntime";

export function initializeNavigationRuntime(): void {
  registerCanonicalNavigation();
  registerCanonicalRouteMetadata();
  syncRouteRuntime();
}
