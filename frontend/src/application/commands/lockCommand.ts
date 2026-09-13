import { requireReason } from "../../lib/validation/requireReason"

export interface PreparedLockCommand {
  lockId: string
  command: string
  reason: string
}

export function prepareLockCommand(
  lockId: string,
  command: string,
  reason: string,
): PreparedLockCommand {
  return {
    lockId: lockId.trim(),
    command: command.trim(),
    reason: requireReason(reason),
  }
}
