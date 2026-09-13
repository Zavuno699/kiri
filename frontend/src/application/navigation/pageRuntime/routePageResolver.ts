import {
  getRouteMetadata,
} from "../registry/routeMetadataRegistry";

export function resolveRoutePage(
  route: string,
) {
  return getRouteMetadata(
    route,
  );
}
