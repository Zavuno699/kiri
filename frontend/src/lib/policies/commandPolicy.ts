export interface CommandPolicyContext {
  targetAvailable: boolean
  targetReady: boolean
  authorized: boolean
  reasonProvided: boolean
}

export function canPrepareCommand(
  context: CommandPolicyContext,
): boolean {
  return (
    context.targetAvailable &&
    context.authorized &&
    context.reasonProvided
  )
}

export function canSubmitCommand(
  context: CommandPolicyContext,
): boolean {
  return (
    canPrepareCommand(context) &&
    context.targetReady
  )
}
