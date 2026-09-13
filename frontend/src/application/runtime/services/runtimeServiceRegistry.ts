import type { RuntimeService } from "./runtimeService"

export interface RuntimeServiceRegistry {
  register(service: RuntimeService): void
  get(id: string): RuntimeService | undefined
  list(): RuntimeService[]
}

export function createRuntimeServiceRegistry(): RuntimeServiceRegistry {
  const services = new Map<string, RuntimeService>()

  return {
    register(service) {
      services.set(service.id, service)
    },

    get(id) {
      return services.get(id)
    },

    list() {
      return [...services.values()]
    },
  }
}
