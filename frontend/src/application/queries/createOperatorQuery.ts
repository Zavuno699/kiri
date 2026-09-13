import type { OperatorQuery } from "./operatorQuery"

export function createOperatorQuery<T>(
  type: string,
  domain: string,
  params: T,
): OperatorQuery<T> {
  return {
    type,
    domain,
    params,
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    createdAt: new Date().toISOString(),
  }
}
