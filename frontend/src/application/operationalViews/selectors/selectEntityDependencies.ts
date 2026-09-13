import {
  listDataDependencies,
} from "../../dataFabric/dependencies/dependencyStore";

import type {
  OperationalDependencyView,
} from "../contracts/operationalDependencyView";

export function selectEntityDependencies(
  domain: string,
): OperationalDependencyView[] {
  return listDataDependencies()
    .filter(
      (dependency) =>
        dependency.sourceDomain ===
          domain ||
        dependency.targetDomain ===
          domain,
    )
    .map(
      (dependency) => ({
        id:
          dependency.id,
        sourceDomain:
          dependency.sourceDomain,
        targetDomain:
          dependency.targetDomain,
        sourceType:
          dependency.sourceType,
        targetType:
          dependency.targetType,
        reason:
          dependency.reason,
        required:
          dependency.required,
      }),
    );
}
