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
