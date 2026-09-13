import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface PropertyActionCommand {
  commandId: string
  type: string
  domain: "properties"
  entityId?: string
  payload?: unknown
}

export function createPropertyActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): PropertyActionCommand {
  const command =
    prepareCommand(
      "properties",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "properties",
    entityId,
    payload,
  }
}
