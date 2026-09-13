import type { PropertyCommandType } from "./propertyCommandTypes"

export function propertyCommandAllowed(
  type: PropertyCommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}
