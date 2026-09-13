import {
  executeCommand,
} from "../runtime/executeCommand";

export function executeDevicesCommand(
  commandId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeCommand({
    commandId,
    entityId,
    domain:
      "devices",
    parameters,
    correlationId:
      crypto.randomUUID(),
    requestedAt:
      new Date().toISOString(),
  });
}
