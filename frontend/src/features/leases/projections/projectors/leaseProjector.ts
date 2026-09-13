export interface LeaseProjector<T> {
  project(event: T): unknown
}

export function createLeaseProjector<T>(
  project: (event: T) => unknown,
): LeaseProjector<T> {
  return {
    project,
  }
}
