export interface SecurityProjector<T> {
  project(event: T): unknown
}

export function createSecurityProjector<T>(
  project: (event: T) => unknown,
): SecurityProjector<T> {
  return {
    project,
  }
}
