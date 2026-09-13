import {
  executeCommand,
} from "../runtime/executeCommand";

export function executeDashboardCommand(
  commandId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeCommand({
    commandId,
    entityId,
    domain:
      "dashboard",
    parameters,
    correlationId:
      crypto.randomUUID(),
    requestedAt:
      new Date().toISOString(),
  });
}
