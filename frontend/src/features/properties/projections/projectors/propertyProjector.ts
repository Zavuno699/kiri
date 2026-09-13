export interface PropertyProjector<T> {
  project(event: T): unknown
}

export function createPropertyProjector<T>(
  project: (event: T) => unknown,
): PropertyProjector<T> {
  return {
    project,
  }
}
