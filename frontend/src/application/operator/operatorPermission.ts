export type OperatorPermission =
  | "view"
  | "inspect"
  | "prepare-command"
  | "execute-command"
  | "freeze"
  | "revoke-access"

export interface OperatorPermissionContext {
  verified: boolean
  authorized: boolean
  reasonProvided: boolean
}

export function canExecuteOperatorAction(
  context: OperatorPermissionContext,
): boolean {
  return (
    context.verified &&
    context.authorized &&
    context.reasonProvided
  )
}
