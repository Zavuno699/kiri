import type {
  RouteMetadata,
} from "../contracts/routeMetadata";

const routes = new Map<
  string,
  RouteMetadata
>();

export function registerRouteMetadata(
  metadata: RouteMetadata,
): void {
  routes.set(
    metadata.route,
    metadata,
  );
}

export function getRouteMetadata(
  route: string,
): RouteMetadata | null {
  return (
    routes.get(route) ??
    null
  );
}

export function listRouteMetadata(): RouteMetadata[] {
  return [
    ...routes.values(),
  ];
}
