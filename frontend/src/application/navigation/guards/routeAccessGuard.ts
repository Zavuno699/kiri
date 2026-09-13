import {
  authorizeCapability,
} from "../../security/core/securityAuthorizationService";

import {
  getRouteMetadata,
} from "../registry/routeMetadataRegistry";

export function canAccessRoute(
  route: string,
): boolean {
  const metadata =
    getRouteMetadata(
      route,
    );

  if (!metadata) {
    return false;
  }

  if (!metadata.protected) {
    return true;
  }

  return (
    authorizeCapability(
      metadata.capability,
    ).decision ===
    "allow"
  );
}
