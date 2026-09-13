export interface RuntimeCoordinator {
  start(): Promise<void>
  stop(): Promise<void>
}

export function createRuntimeCoordinator(
  onStart: () => Promise<void>,
  onStop: () => Promise<void>,
): RuntimeCoordinator {
  return {
    start: onStart,
    stop: onStop,
  }
}
