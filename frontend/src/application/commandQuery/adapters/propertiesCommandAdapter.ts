import {
  executeCommand,
} from "../runtime/executeCommand";

export function executePropertiesCommand(
  commandId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeCommand({
    commandId,
    entityId,
    domain:
      "properties",
    parameters,
    correlationId:
      crypto.randomUUID(),
    requestedAt:
      new Date().toISOString(),
  });
}
