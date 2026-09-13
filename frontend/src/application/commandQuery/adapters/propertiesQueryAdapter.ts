import {
  executeQuery,
} from "../runtime/executeQuery";

export function executePropertiesQuery(
  queryId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeQuery({
    queryId,
    entityId,
    domain:
      "properties",
    parameters,
    requestedAt:
      new Date().toISOString(),
  });
}
