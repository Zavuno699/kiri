import {
  executeQuery,
} from "../runtime/executeQuery";

export function executeLeasesQuery(
  queryId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeQuery({
    queryId,
    entityId,
    domain:
      "leases",
    parameters,
    requestedAt:
      new Date().toISOString(),
  });
}
