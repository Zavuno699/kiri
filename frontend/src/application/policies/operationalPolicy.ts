export interface OperationalPolicyContext {
  authenticated: boolean
  authorized: boolean
  available: boolean
}

export function canOperate(
  context: OperationalPolicyContext,
): boolean {
  return (
    context.authenticated &&
    context.authorized &&
    context.available
  )
}
