import type { LiveEvent } from "./liveEvent"

export function createLiveEvent<T>(
  type: string,
  domain: string,
  payload?: T,
  correlationId?: string,
): LiveEvent<T> {
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
