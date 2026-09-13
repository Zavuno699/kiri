import type { DeviceCommandType } from "./deviceCommandTypes"

export function deviceCommandAllowed(
  type: DeviceCommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}
