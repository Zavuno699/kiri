export interface PropertyInvalidationController {
  invalidate(
    id?: string,
    reason?: string,
  ): void
}

export function createPropertyInvalidationController(
  invalidate: (
    id?: string,
    reason?: string,
  ) => void,
): PropertyInvalidationController {
  return {
    invalidate,
  }
}
