export interface DeviceSubscription {
  id: string
  active: boolean
  unsubscribe(): void
}

export function createDeviceSubscription():
  DeviceSubscription {
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
