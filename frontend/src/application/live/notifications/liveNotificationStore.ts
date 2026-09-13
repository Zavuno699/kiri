import type { LiveNotification } from "./liveNotification"

export interface LiveNotificationStore {
  push(value: LiveNotification): void
  markRead(id: string): void
  list(unreadOnly?: boolean): LiveNotification[]
}

export function createLiveNotificationStore():
  LiveNotificationStore {
  const values: LiveNotification[] = []

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
        ? values.filter(
            (item) => !item.read,
          )
        : [...values]
    },
  }
}
