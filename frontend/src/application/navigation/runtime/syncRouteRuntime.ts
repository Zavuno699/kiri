import {
  listRouteMetadata,
} from "../registry/routeMetadataRegistry";

import {
  registerRouteRuntime,
} from "../state/routeRuntimeStore";

import {
  canAccessRoute,
} from "../guards/routeAccessGuard";

export function syncRouteRuntime(): void {
  for (
    const route of
      listRouteMetadata()
  ) {
    registerRouteRuntime({
      route:
        route.route,
      domain:
        route.domain,
      active:
        false,
      initialized:
        true,
      guarded:
        route.protected,
      accessible:
        canAccessRoute(
          route.route,
        ),
      lastVisitedAt:
        null,
    });
  }
}
