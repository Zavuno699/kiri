import {
  CANONICAL_ROUTE_LIST,
} from "../router/canonicalRouteList";

import {
  listRouteMetadata,
} from "../registry/routeMetadataRegistry";

export function getNavigationCoverage() {
  const metadata =
    listRouteMetadata();

  return {
    canonicalRouteCount:
      CANONICAL_ROUTE_LIST.length,

    metadataRouteCount:
      metadata.length,

    converged:
      metadata.length ===
      CANONICAL_ROUTE_LIST.length,

    guarded:
      metadata.filter(
        (item) =>
          item.protected,
      ).length,

    operational:
      metadata.filter(
        (item) =>
          item.operational,
      ).length,
  };
}
