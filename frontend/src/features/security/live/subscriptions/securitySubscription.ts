export interface SecuritySubscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function createSecuritySubscription():
  SecuritySubscription {
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
