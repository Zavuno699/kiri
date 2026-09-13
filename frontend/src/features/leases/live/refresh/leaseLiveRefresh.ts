export interface LeaseLiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initialLeaseLiveRefresh:
  LeaseLiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
