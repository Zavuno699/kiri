export interface SecurityInvalidationController {
  invalidate(
    id?: string,
    reason?: string,
  ): void
}

export function createSecurityInvalidationController(
  invalidate: (
    id?: string,
    reason?: string,
  ) => void,
): SecurityInvalidationController {
  return {
    invalidate,
  }
}
