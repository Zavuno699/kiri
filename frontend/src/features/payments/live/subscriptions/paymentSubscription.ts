export interface PaymentSubscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function createPaymentSubscription():
  PaymentSubscription {
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
