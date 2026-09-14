export interface LeaseDataflowController {
  start(): void
  stop(): void
}

export function createLeaseDataflowController():
  LeaseDataflowController {
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
