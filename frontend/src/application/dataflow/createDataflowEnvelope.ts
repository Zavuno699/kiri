import type { DataflowEnvelope } from "./dataflowEnvelope"

export function createDataflowEnvelope<T>(
  domain: string,
  type: string,
  payload: T,
  correlationId?: string,
): DataflowEnvelope<T> {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    domain,
    type,
    version: 1,
    payload,
    correlationId:
      correlationId ??
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    occurredAt: new Date().toISOString(),
  }
}
