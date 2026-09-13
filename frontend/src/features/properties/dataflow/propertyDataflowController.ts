export interface PropertyDataflowController {
  start(): void
  stop(): void
}

export function createPropertyDataflowController():
  PropertyDataflowController {

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
