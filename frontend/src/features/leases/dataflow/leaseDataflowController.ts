export interface LeaseDataflowController {
  start(): void
  stop(): void
}

export function createLeaseDataflowController():
  LeaseDataflowController {

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
