import {
  selectWorkspaceDomain,
} from "../../workspace/runtime/selectWorkspaceDomain";

import {
  resolveRouteDomain,
} from "../pageRuntime/routeDomainResolver";

import {
  startRoute,
} from "./startRoute";

export function synchronizeWorkspaceRoute(
  route: string,
): void {
  const domain =
    resolveRouteDomain(
      route,
    );

  if (domain) {
    selectWorkspaceDomain(
      domain,
    );
  }

  startRoute(
    route,
  );
}
