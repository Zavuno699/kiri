export interface LockDataflowController {
  start(): void
  stop(): void
}

export function createLockDataflowController():
  LockDataflowController {
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
