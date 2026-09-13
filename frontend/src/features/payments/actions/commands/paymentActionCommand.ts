import { prepareCommand } from "../../../../application/commands/preparation/commandPreparation"

export interface PaymentActionCommand {
  commandId: string
  type: string
  domain: "payments"
  entityId?: string
  payload?: unknown
}

export function createPaymentActionCommand(
  type: string,
  entityId?: string,
  payload?: unknown,
): PaymentActionCommand {
  const command =
    prepareCommand(
      "payments",
      type,
      payload,
    )

  return {
    commandId: command.commandId,
    type: command.type,
    domain: "payments",
    entityId,
    payload,
  }
}
