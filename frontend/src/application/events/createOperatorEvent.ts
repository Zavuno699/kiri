import type { OperatorEvent } from "./operatorEvent"

export function createOperatorEvent<T>(
  type: string,
  domain: string,
  payload: T,
  correlationId?: string,
): OperatorEvent<T> {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    type,
    domain,
    payload,
    occurredAt: new Date().toISOString(),
    correlationId,
  }
}
