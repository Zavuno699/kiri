import { applicationClient } from "../../../../application/clients/applicationClient"

export interface DeviceCommand {
  type: string
  payload?: unknown
}

export async function sendDeviceCommand(
  command: DeviceCommand,
): Promise<unknown> {
  return applicationClient.post(
    "/api/v1/devices/command",
    command,
  )
}
