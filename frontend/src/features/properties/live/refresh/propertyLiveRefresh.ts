export interface PropertyLiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initialPropertyLiveRefresh:
  PropertyLiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
