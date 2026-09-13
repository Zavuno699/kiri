import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface DeviceActionCommand {
  commandId: string
  type: string
  domain: "devices"
  entityId?: string
  payload?: unknown
}

export function createDeviceActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): DeviceActionCommand {
  const command =
    prepareCommand(
      "devices",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "devices",
    entityId,
    payload,
  }
}
