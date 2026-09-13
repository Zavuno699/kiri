export interface LockSubscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function createLockSubscription():
  LockSubscription {
  let active = true

  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      String(Date.now()),

    get active() {
      return active
    },

    unsubscribe() {
      active = false
    },
  }
}
