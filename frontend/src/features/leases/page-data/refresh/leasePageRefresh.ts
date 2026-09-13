export interface LeasePageRefresh {
  refreshing: boolean
  requestedAt?: string
  completedAt?: string
}

export function initialLeasePageRefresh():
  LeasePageRefresh {
  return {
    refreshing: false,
  }
}
