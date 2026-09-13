import {
  getNavigationItems,
} from "../state/navigationStore";

import {
  listRouteMetadata,
} from "../registry/routeMetadataRegistry";

import {
  listRouteRuntimeStates,
} from "../state/routeRuntimeStore";

export function getNavigationDiagnostics() {
  const states =
    listRouteRuntimeStates();

  return {
    navigationItems:
      getNavigationItems().length,

    routeMetadata:
      listRouteMetadata().length,

    routeRuntime:
      states.length,

    accessibleRoutes:
      states.filter(
        (state) =>
          state.accessible,
      ).length,

    activeRoutes:
      states.filter(
        (state) =>
          state.active,
      ).length,

    guardedRoutes:
      states.filter(
        (state) =>
          state.guarded,
      ).length,
  };
}
