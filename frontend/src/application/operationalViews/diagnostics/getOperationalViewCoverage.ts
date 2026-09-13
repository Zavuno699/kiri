import {
  listOperationalEntities,
} from "../registry/operationalEntityRegistry";

import {
  getWorkbenchDiagnostics,
} from "./getWorkbenchDiagnostics";

export function getOperationalViewCoverage() {
  const diagnostics =
    getWorkbenchDiagnostics();

  return {
    registeredEntities:
      listOperationalEntities().length,
    relatedEntities:
      diagnostics.relatedCount,
    relationships:
      diagnostics.relationshipCount,
    dependencies:
      diagnostics.dependencyCount,
    ready:
      !diagnostics.loading &&
      diagnostics.error ===
        null,
  };
}
