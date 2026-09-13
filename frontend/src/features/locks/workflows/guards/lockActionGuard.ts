export function lockActionGuard(
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
