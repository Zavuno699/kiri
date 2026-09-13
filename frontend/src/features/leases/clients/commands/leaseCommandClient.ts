import { applicationClient } from "../../../../application/clients/applicationClient"

export interface LeaseCommand {
  type: string
  payload?: unknown
}

export async function sendLeaseCommand(
  command: LeaseCommand,
): Promise<unknown> {
  return applicationClient.post(
    "/api/v1/leases/command",
    command,
  )
}
