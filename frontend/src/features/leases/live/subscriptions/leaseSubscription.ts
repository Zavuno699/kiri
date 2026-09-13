export interface LeaseSubscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function createLeaseSubscription():
  LeaseSubscription {
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
