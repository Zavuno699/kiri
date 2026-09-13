export interface AccessPolicyContext {
  securityVerified: boolean
  authorizationVerified: boolean
  leaseContextVerified: boolean
  reasonProvided: boolean
}

export function canChangeAccess(
  context: AccessPolicyContext,
): boolean {
  return (
    context.securityVerified &&
    context.authorizationVerified &&
    context.leaseContextVerified &&
    context.reasonProvided
  )
}
