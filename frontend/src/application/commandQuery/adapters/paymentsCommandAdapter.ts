import {
  executeCommand,
} from "../runtime/executeCommand";

export function executePaymentsCommand(
  commandId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeCommand({
    commandId,
    entityId,
    domain:
      "payments",
    parameters,
    correlationId:
      crypto.randomUUID(),
    requestedAt:
      new Date().toISOString(),
  });
}
