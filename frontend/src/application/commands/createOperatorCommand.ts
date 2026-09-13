import type { OperatorCommand } from "./operatorCommand"

export function createOperatorCommand<T>(
  type: string,
  domain: string,
  payload: T,
): OperatorCommand<T> {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    type,
    domain,
    payload,
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    createdAt: new Date().toISOString(),
  }
}
