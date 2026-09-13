import { applicationClient } from "../../../../application/clients/applicationClient"

export interface PaymentCommand {
  type: string
  payload?: unknown
}

export async function sendPaymentCommand(
  command: PaymentCommand,
): Promise<unknown> {
  return applicationClient.post(
    "/api/v1/payments/command",
    command,
  )
}
