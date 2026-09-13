export interface LockPageRefresh {
  refreshing: boolean
  requestedAt?: string
  completedAt?: string
}

export function initialLockPageRefresh():
  LockPageRefresh {
  return {
    refreshing: false,
  }
}
