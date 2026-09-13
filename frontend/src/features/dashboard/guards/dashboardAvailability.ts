export interface DashboardAvailability {
  available: boolean
  reason?: string
}

export function dashboardAvailable(): DashboardAvailability {
  return {
    available: true,
  }
}
