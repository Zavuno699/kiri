import {
  getRouteMetadata,
} from "../registry/routeMetadataRegistry";

export function getNavigationTitle(
  route: string,
): string {
  return (
    getRouteMetadata(
      route,
    )?.title ??
    "KiriLock"
  );
}
