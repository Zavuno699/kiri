import {
  executeQuery,
} from "../runtime/executeQuery";

export function executeDashboardQuery(
  queryId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeQuery({
    queryId,
    entityId,
    domain:
      "dashboard",
    parameters,
    requestedAt:
      new Date().toISOString(),
  });
}
