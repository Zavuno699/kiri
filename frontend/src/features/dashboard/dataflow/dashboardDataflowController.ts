export interface DashboardDataflowController {
  start(): void
  stop(): void
}

export function createDashboardDataflowController():
  DashboardDataflowController {
  let running = false;

  return {
    start() {
      running = true;
      void running;
    },

    stop() {
      running = false;
      void running;
    },
  }
}
