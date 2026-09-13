import {
  getRouteMetadata,
} from "../registry/routeMetadataRegistry";

export function resolveRouteDomain(
  route: string,
): string | null {
  return (
    getRouteMetadata(
      route,
    )?.domain ??
    null
  );
}
