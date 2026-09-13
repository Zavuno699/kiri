export interface SecurityLiveState {
  domain: "security"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initialSecurityLiveState:
  SecurityLiveState = {
  domain: "security",
  connected: false,
  stale: false,
  degraded: false ? false : true,
}
