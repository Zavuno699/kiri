export interface SecurityDataflowController {
  start(): void
  stop(): void
}

export function createSecurityDataflowController():
  SecurityDataflowController {
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
