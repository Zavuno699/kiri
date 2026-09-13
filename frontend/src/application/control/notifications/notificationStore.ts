import type { Notification } from "./notification"

export interface NotificationStore {
  push(value: Notification): void
  markRead(id: string): void
  list(unreadOnly?: boolean): Notification[]
  clear(): void
}

export function createNotificationStore():
  NotificationStore {
  const values: Notification[] = []

  return {
    push(value) {
      values.unshift(value)
    },

    markRead(id) {
      const value = values.find(
        (item) => item.id === id,
      )

      if (value) {
        value.read = true
      }
    },

    list(unreadOnly) {
      return unreadOnly
        ? values.filter((item) => !item.read)
        : [...values]
    },

    clear() {
      values.length = 0
    },
  }
}
