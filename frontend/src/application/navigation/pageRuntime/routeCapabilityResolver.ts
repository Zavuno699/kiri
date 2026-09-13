import {
  getRouteMetadata,
} from "../registry/routeMetadataRegistry";

export function resolveRouteCapability(
  route: string,
): string | null {
  return (
    getRouteMetadata(
      route,
    )?.capability ??
    null
  );
}
