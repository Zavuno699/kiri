import type { Notification } from "./notification"

export function createNotification(
  level: Notification["level"],
  title: string,
  message: string,
  domain?: string,
): Notification {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    level,
    title,
    message,
    domain,
    createdAt: new Date().toISOString(),
    read: false,
  }
}
