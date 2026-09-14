export interface SecurityDataflowController {
  start(): void
  stop(): void
}

export function createSecurityDataflowController():
  SecurityDataflowController {
  let running = false;

  return {
    start() {
      running = true;
      void running; // Suppress unused warning
    },

    stop() {
      running = false;
      void running; // Suppress unused warning
    },
  }
}
