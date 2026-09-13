import {
  executeQuery,
} from "../runtime/executeQuery";

export function executePaymentsQuery(
  queryId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeQuery({
    queryId,
    entityId,
    domain:
      "payments",
    parameters,
    requestedAt:
      new Date().toISOString(),
  });
}
