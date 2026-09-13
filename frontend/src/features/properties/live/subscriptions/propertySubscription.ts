export interface PropertySubscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function createPropertySubscription():
  PropertySubscription {
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
