import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface LockActionCommand {
  commandId: string
  type: string
  domain: "locks"
  entityId?: string
  payload?: unknown
}

export function createLockActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): LockActionCommand {
  const command =
    prepareCommand(
      "locks",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "locks",
    entityId,
    payload,
  }
}
