export interface LeaseDataflowController {
  start(): void
  stop(): void
}

export function createLeaseDataflowController():
  LeaseDataflowController {
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
