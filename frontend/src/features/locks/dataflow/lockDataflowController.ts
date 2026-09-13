export interface LockDataflowController {
  start(): void
  stop(): void
}

export function createLockDataflowController():
  LockDataflowController {

  return {
    start() {
      running = true
    },

    stop() {
      running = false
    },
  }
}
