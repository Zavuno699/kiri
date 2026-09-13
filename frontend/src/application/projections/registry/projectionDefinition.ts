export interface ResourceState<T> {
  data: T
  version: number
}

export interface ProjectionDefinition<T = unknown> {
  key: string
  project(
    state: ResourceState<T>,
    payload: unknown,
  ): ResourceState<T>
}
