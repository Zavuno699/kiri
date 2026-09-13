import type { LockCommandType } from "./lockCommandTypes"

export function lockCommandAllowed(
  type: LockCommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}
