import type { SecurityCommandType } from "./securityCommandTypes"

export function securityCommandAllowed(
  type: SecurityCommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}
