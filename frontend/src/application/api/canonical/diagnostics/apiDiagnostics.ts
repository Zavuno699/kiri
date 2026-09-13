import {
  listApiResources,
} from "../registry/resourceRegistry";

import {
  listApiOperations,
} from "../registry/operationRegistry";

export function getApiDiagnostics() {
  const resources =
    listApiResources();

  const operations =
    listApiOperations();

  return {
    resources:
      resources.length,
    operations:
      operations.length,
    authenticatedOperations:
      operations.filter(
        (operation) =>
          operation.authenticated,
      ).length,
    dangerousOperations:
      operations.filter(
        (operation) =>
          operation.capability?.includes(
            "command",
          ) ||
          operation.capability ===
            "security.admin",
      ).length,
  };
}
