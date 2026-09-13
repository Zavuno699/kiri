import {
  requireRouteAccess,
} from "../guards/requireRouteAccess";

import {
  setSelectedRoute,
} from "../state/navigationStore";

import {
  updateRouteRuntimeState,
} from "../state/routeRuntimeStore";

export function startRoute(
  route: string,
): void {
  requireRouteAccess(
    route,
  );

  setSelectedRoute(
    route,
  );

  updateRouteRuntimeState(
    route,
    {
      active: true,
      initialized: true,
      accessible: true,
      lastVisitedAt:
        new Date().toISOString(),
    },
  );
}
