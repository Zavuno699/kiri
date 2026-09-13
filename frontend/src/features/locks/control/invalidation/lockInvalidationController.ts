export interface LockInvalidationController {
  invalidate(
    id?: string,
    reason?: string,
  ): void
}

export function createLockInvalidationController(
  invalidate: (
    id?: string,
    reason?: string,
  ) => void,
): LockInvalidationController {
  return {
    invalidate,
  }
}
