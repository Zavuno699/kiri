import {
  executeQuery,
} from "../runtime/executeQuery";

export function executeSecurityQuery(
  queryId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeQuery({
    queryId,
    entityId,
    domain:
      "security",
    parameters,
    requestedAt:
      new Date().toISOString(),
  });
}
