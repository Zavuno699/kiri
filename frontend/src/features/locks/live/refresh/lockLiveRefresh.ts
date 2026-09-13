export interface LockLiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initialLockLiveRefresh:
  LockLiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
