import {
  executeQuery,
} from "../runtime/executeQuery";

export function executeDevicesQuery(
  queryId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeQuery({
    queryId,
    entityId,
    domain:
      "devices",
    parameters,
    requestedAt:
      new Date().toISOString(),
  });
}
