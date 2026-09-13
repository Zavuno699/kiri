export interface OperatorOrchestrator {
  refreshAll(): Promise<void>
}

export function createOperatorOrchestrator(
  refreshers: Array<() => Promise<unknown>>,
): OperatorOrchestrator {
  return {
    async refreshAll() {
      for (const refresh of refreshers) {
        try {
          await refresh()
        } catch {
          // Individual domains remain fail-closed;
          // one degraded domain must not erase other state.
        }
      }
    },
  }
}
