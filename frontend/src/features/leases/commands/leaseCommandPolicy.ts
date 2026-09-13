import type { LeaseCommandType } from "./leaseCommandTypes"

export function leaseCommandAllowed(
  type: LeaseCommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}
