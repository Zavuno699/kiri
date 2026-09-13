export interface FreezePolicyContext {
  authorizationVerified: boolean
  propertyContextVerified: boolean
  reasonProvided: boolean
}

export function canApplyFreeze(
  context: FreezePolicyContext,
): boolean {
  return (
    context.authorizationVerified &&
    context.propertyContextVerified &&
    context.reasonProvided
  )
}
