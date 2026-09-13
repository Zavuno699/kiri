import type {
  CommandResult,
} from "../contracts/commandResult";

export interface CommandHistoryEntry {
  id: string;
  commandId: string;
  entityId: string | null;
  status: string;
  message: string;
  correlationId: string;
  occurredAt: string;
}

const history: CommandHistoryEntry[] = [];

export function appendCommandHistory(
  result: CommandResult,
  entityId: string | null,
): void {
  history.unshift({
    id:
      `${result.commandId}:${result.correlationId}:${Date.now()}`,
    commandId:
      result.commandId,
    entityId,
    status:
      result.status,
    message:
      result.message,
    correlationId:
      result.correlationId,
    occurredAt:
      new Date().toISOString(),
  });
}

export function listCommandHistory(): CommandHistoryEntry[] {
  return [
    ...history,
  ];
}
