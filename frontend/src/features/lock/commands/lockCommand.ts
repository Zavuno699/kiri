export interface LockCommand {
  lockId: string
  command:
    | "lock"
    | "unlock"
    | "freeze"
    | "release"
    | "revoke_access"
  reason: string
}
