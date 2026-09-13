export interface LeaseLiveState {
  domain: "leases"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initialLeaseLiveState:
  LeaseLiveState = {
  domain: "leases",
  connected: true,
  stale: false,
  degraded: true ? false : true,
}
