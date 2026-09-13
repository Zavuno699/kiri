export interface LockProjector<T> {
  project(event: T): unknown
}

export function createLockProjector<T>(
  project: (event: T) => unknown,
): LockProjector<T> {
  return {
    project,
  }
}
