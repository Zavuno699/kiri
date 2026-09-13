
import { authenticationAllowed } from "../guards/authenticationGuard";
import { sessionAllowed } from "../guards/sessionGuard";
import type { SecurityRouteState } from "./securityRouteState";

export function resolveSecurityRoute(
  requestedPath: string,
): SecurityRouteState {
  if (!authenticationAllowed()) {
    return {
      authenticated: false,
      sessionActive: false,
      authorized: false,
      restricted: true,
      redirectTo: `/signin?returnTo=${encodeURIComponent(requestedPath)}`,
    };
  }

  if (!sessionAllowed()) {
    return {
      authenticated: true,
      sessionActive: false,
      authorized: false,
      restricted: true,
      redirectTo: `/session-expired?returnTo=${encodeURIComponent(
        requestedPath,
      )}`,
    };
  }

  return {
    authenticated: true,
    sessionActive: true,
    authorized: true,
    restricted: false,
  };
}

