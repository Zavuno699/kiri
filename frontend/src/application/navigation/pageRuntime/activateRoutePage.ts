import {
  resolveRoutePage,
} from "./routePageResolver";

import {
  synchronizeWorkspaceRoute,
} from "../runtime/synchronizeWorkspaceRoute";

export function activateRoutePage(
  route: string,
) {
  const page =
    resolveRoutePage(
      route,
    );

  if (!page) {
    throw new Error(
      `Unknown route page: ${route}`,
    );
  }

  synchronizeWorkspaceRoute(
    route,
  );

  return page;
}
