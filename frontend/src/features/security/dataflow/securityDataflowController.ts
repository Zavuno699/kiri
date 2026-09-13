export interface SecurityDataflowController {
  start(): void
  stop(): void
}

export function createSecurityDataflowController():
  SecurityDataflowController {

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
