import type { LiveNotification } from "./liveNotification"

export function createLiveNotification(
  domain: string,
  level: LiveNotification["level"],
  title: string,
  message: string,
): LiveNotification {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    level,
    domain,
    title,
    message,
    read: false,
    createdAt:
      new Date().toISOString(),
  }
}
