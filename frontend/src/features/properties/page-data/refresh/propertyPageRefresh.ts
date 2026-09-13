export interface PropertyPageRefresh {
  refreshing: boolean
  requestedAt?: string
  completedAt?: string
}

export function initialPropertyPageRefresh():
  PropertyPageRefresh {
  return {
    refreshing: false,
  }
}
