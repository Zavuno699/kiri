export interface DashboardSubscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function createDashboardSubscription():
  DashboardSubscription {
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
