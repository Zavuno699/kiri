import type {
  BreadcrumbItem,
} from "../contracts/breadcrumbItem";

import {
  getRouteMetadata,
} from "../registry/routeMetadataRegistry";

export function buildBreadcrumbs(
  route: string,
): BreadcrumbItem[] {
  const metadata =
    getRouteMetadata(
      route,
    );

  if (!metadata) {
    return [];
  }

  return metadata.breadcrumb.map(
    (label, index) => ({
      label,
      route:
        index ===
        metadata.breadcrumb.length - 1
          ? route
          : "/",
      active:
        index ===
        metadata.breadcrumb.length - 1,
    }),
  );
}
