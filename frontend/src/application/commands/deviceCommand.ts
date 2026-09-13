import { requireReason } from "../../lib/validation/requireReason"

export interface PreparedDeviceCommand {
  deviceId: string
  commandType: string
  reason: string
  correlationId?: string
}

export function prepareDeviceCommand(
  deviceId: string,
  commandType: string,
  reason: string,
  correlationId?: string,
): PreparedDeviceCommand {
  return {
    deviceId: deviceId.trim(),
    commandType: commandType.trim(),
    reason: requireReason(reason),
    correlationId,
  }
}
