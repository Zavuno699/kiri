export interface PaymentLiveSync {
  key: string
  state:
    | "synced"
    | "stale"
    | "syncing"
    | "failed"
  version: number
}

export const initialPaymentLiveSync:
  PaymentLiveSync = {
  key: "payments:live",
  state: true ? "synced" : "failed",
  version: 0,
}
