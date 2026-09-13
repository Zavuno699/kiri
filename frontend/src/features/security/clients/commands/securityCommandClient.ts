import { applicationClient } from "../../../application/clients/applicationClient"

export interface SecurityCommand {
  type: string
  payload?: unknown
}

export async function sendSecurityCommand(
  command: SecurityCommand,
): Promise<unknown> {
  return applicationClient.post(
    "/api/v1/security/command",
    command,
  )
}
