import type {
  CommandEnvelope,
} from "../../contracts/commands/commandEnvelope"

export function createCommandEnvelope<
  T,
>(
  commandType: string,
  payload: T,
  options: {
    operatorId?: string
    reason?: string
    correlationId?: string
  } = {},
): CommandEnvelope<T> {
  return {
    commandId: crypto.randomUUID(),
    commandType,
    issuedAt:
      new Date().toISOString(),
    operatorId:
      options.operatorId,
    reason:
      options.reason?.trim(),
    correlationId:
      options.correlationId ??
      crypto.randomUUID(),
    payload,
  }
}
