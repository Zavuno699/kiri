import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface DashboardActionCommand {
  commandId: string
  type: string
  domain: "dashboard"
  entityId?: string
  payload?: unknown
}

export function createDashboardActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): DashboardActionCommand {
  const command =
    prepareCommand(
      "dashboard",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "dashboard",
    entityId,
    payload,
  }
}
