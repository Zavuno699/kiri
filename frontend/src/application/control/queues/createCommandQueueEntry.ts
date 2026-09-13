import type { CommandQueueEntry } from "./commandQueueEntry"

export function createCommandQueueEntry<T>(
  type: string,
  domain: string,
  payload: T,
): CommandQueueEntry<T> {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    type,
    domain,
    payload,
    state: "queued",
    createdAt: new Date().toISOString(),
  }
}
