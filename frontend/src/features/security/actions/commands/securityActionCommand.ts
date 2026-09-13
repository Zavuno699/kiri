import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface SecurityActionCommand {
  commandId: string
  type: string
  domain: "security"
  entityId?: string
  payload?: unknown
}

export function createSecurityActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): SecurityActionCommand {
  const command =
    prepareCommand(
      "security",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "security",
    entityId,
    payload,
  }
}
