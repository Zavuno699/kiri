export interface ResourceProjection<T, V> {
  project(value: T): V
}

export function createProjection<T, V>(
  projector: (value: T) => V,
): ResourceProjection<T, V> {
  return {
    project: projector,
  }
}
