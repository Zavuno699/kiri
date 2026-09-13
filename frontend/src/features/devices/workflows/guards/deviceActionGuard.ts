export function deviceActionGuard(
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
