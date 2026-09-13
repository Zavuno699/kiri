export interface DashboardActionPolicy {
  enabled: boolean
  confirmationRequired: boolean
  reason?: string
}

export const dashboardActionPolicy:
  DashboardActionPolicy = {
  enabled: false,
  confirmationRequired: true,
  reason:
    false
      ? undefined
      : "Production command ingress is not verified.",
}
