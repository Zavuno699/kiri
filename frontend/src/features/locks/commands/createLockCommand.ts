import type { LockCommandType } from "./lockCommandTypes"

export interface LockCommand {
  type: LockCommandType
  lockId?: string
}

export function createLockCommand(
  type: LockCommandType,
  lockId?: string,
): LockCommand {
  return {
    type,
    lockId,
  }
}
