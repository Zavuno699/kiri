export interface DashboardDataflowController {
  start(): void
  stop(): void
}

export function createDashboardDataflowController():
  DashboardDataflowController {

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
