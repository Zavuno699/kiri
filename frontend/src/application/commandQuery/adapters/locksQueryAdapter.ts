import {
  executeQuery,
} from "../runtime/executeQuery";

export function executeLocksQuery(
  queryId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeQuery({
    queryId,
    entityId,
    domain:
      "locks",
    parameters,
    requestedAt:
      new Date().toISOString(),
  });
}
