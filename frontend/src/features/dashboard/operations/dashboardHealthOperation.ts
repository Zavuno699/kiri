export interface DashboardHealthOperation {
  evaluate(
    services: Array<{ healthy: boolean }>,
  ): {
    healthy: number
    degraded: number
  }
}

export function createDashboardHealthOperation():
  DashboardHealthOperation {
  return {
    evaluate(services) {
      return {
        healthy: services.filter((item) => item.healthy).length,
        degraded: services.filter((item) => !item.healthy).length,
      }
    },
  }
}
