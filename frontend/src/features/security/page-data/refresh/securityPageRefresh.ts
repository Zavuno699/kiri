export interface SecurityPageRefresh {
  refreshing: boolean
  requestedAt?: string
  completedAt?: string
}

export function initialSecurityPageRefresh():
  SecurityPageRefresh {
  return {
    refreshing: false,
  }
}
