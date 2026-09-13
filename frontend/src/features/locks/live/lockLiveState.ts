export interface LockLiveState {
  domain: "locks"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initialLockLiveState:
  LockLiveState = {
  domain: "locks",
  connected: false,
  stale: false,
  degraded: false ? false : true,
}
