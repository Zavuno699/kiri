export interface DashboardNotificationPolicy {
  reportFailures: boolean
  reportBlocks: boolean
  reportSuccess: boolean
}

export const dashboardNotificationPolicy:
  DashboardNotificationPolicy = {
  reportFailures: true,
  reportBlocks: true,
  reportSuccess: true,
}
