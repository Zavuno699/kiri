import type { RuntimeService } from "./services/runtimeService"

export interface RuntimeLifecycle {
  start(): Promise<void>
  stop(): Promise<void>
}

export function createRuntimeLifecycle(
  services: RuntimeService[],
): RuntimeLifecycle {
  return {
    async start() {
      for (const service of services) {
        await service.start()
      }
    },

    async stop() {
      for (const service of [...services].reverse()) {
        await service.stop()
      }
    },
  }
}
