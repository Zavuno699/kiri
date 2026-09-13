import {
  canAccessRoute,
} from "./routeAccessGuard";

export function requireRouteAccess(
  route: string,
): void {
  if (!canAccessRoute(route)) {
    throw new Error(
      `Route access denied: ${route}`,
    );
  }
}
