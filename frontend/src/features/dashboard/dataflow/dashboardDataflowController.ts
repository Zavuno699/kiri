export interface DashboardDataflowController {
  start(): void
  stop(): void
}

export function createDashboardDataflowController():
  DashboardDataflowController {
  let running = false

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
