import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface LeaseActionCommand {
  commandId: string
  type: string
  domain: "leases"
  entityId?: string
  payload?: unknown
}

export function createLeaseActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): LeaseActionCommand {
  const command =
    prepareCommand(
      "leases",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "leases",
    entityId,
    payload,
  }
}
