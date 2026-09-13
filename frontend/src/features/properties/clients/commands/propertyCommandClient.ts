import { applicationClient } from "../../../../application/clients/applicationClient"

export interface PropertyCommand {
  type: string
  payload?: unknown
}

export async function sendPropertyCommand(
  command: PropertyCommand,
): Promise<unknown> {
  return applicationClient.post(
    "/api/v1/properties/command",
    command,
  )
}
