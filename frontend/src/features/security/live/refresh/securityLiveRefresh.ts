export interface SecurityLiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initialSecurityLiveRefresh:
  SecurityLiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
