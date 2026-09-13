import type { DashboardSnapshot } from "../types/dashboard"

export const dashboardFallback: DashboardSnapshot = {
  summary: {
    properties: 0,
    activeLeases: 0,
    paymentsToday: 0,
    locksOnline: 0,
    locksTotal: 0,
    securityAlerts: 0,
    healthyServices: 0,
    totalServices: 0,
  },
  health: {
    overall: "unknown",
    api: "unknown",
    database: "unknown",
    messaging: "unknown",
    devices: "unknown",
  },
  recentEvents: [],
}
