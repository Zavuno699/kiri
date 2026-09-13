import {
  executeCommand,
} from "../runtime/executeCommand";

export function executeLeasesCommand(
  commandId: string,
  entityId: string | null,
  parameters: Record<string, unknown> = {},
) {
  return executeCommand({
    commandId,
    entityId,
    domain:
      "leases",
    parameters,
    correlationId:
      crypto.randomUUID(),
    requestedAt:
      new Date().toISOString(),
  });
}
