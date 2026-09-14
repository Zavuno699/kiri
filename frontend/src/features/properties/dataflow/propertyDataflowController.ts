export interface PropertyDataflowController {
  start(): void
  stop(): void
}

export function createPropertyDataflowController():
  PropertyDataflowController {
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
