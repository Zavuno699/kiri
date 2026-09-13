export function leaseActionGuard(
  enabled: boolean,
  authenticated: boolean,
  authorized: boolean,
): boolean {
  return (
    enabled &&
    authenticated &&
    authorized
  )
}
