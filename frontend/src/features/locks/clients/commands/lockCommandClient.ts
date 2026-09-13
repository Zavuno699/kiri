import { applicationClient } from "../../../../application/clients/applicationClient"

export interface LockCommand {
  type: string
  payload?: unknown
}

export async function sendLockCommand(
  command: LockCommand,
): Promise<unknown> {
  return applicationClient.post(
    "/api/v1/locks/command",
    command,
  )
}
