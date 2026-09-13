export interface LeaseInvalidationController {
  invalidate(
    id?: string,
    reason?: string,
  ): void
}

export function createLeaseInvalidationController(
  invalidate: (
    id?: string,
    reason?: string,
  ) => void,
): LeaseInvalidationController {
  return {
    invalidate,
  }
}
