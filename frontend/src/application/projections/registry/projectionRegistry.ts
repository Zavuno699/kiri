import type { ProjectionDefinition } from "./projectionDefinition"

const registry = new Map<
  string,
  ProjectionDefinition<any>
>()

export function createProjectionRegistry() {
  return {
    register<T>(
      definition: ProjectionDefinition<T>,
    ) {
      registry.set(
        definition.key,
        definition as ProjectionDefinition<any>,
      )

      return definition
    },

    get<T>(
      key: string,
    ): ProjectionDefinition<T> | undefined {
      return registry.get(key) as
        | ProjectionDefinition<T>
        | undefined
    },

    list(): ProjectionDefinition<any>[] {
      return [...registry.values()]
    },
  }
}

export function registerProjection<T>(definition: ProjectionDefinition<T>): ProjectionDefinition<T> {
  return createProjectionRegistry().register(definition)
}

export function getProjection<T>(key: string): ProjectionDefinition<T> | undefined {
  return createProjectionRegistry().get<T>(key)
}

export function listProjections(): ProjectionDefinition<any>[] {
  return createProjectionRegistry().list()
}
