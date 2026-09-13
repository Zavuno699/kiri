import type { ApplicationSurface } from "./applicationSurface"

export interface SurfaceRegistry {
  register(surface: ApplicationSurface): void
  get(id: string): ApplicationSurface | undefined
  list(): ApplicationSurface[]
}

export function createSurfaceRegistry(): SurfaceRegistry {
  const values = new Map<string, ApplicationSurface>()

  return {
    register(surface) {
      values.set(surface.id, surface)
    },

    get(id) {
      return values.get(id)
    },

    list() {
      return [...values.values()]
    },
  }
}
