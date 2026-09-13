import { applicationClient } from "../../../application/clients/applicationClient"

export interface DashboardCommand {
  type: string
  payload?: unknown
}

export async function sendDashboardCommand(
  command: DashboardCommand,
): Promise<unknown> {
  return applicationClient.post(
    "/api/v1/dashboard/command",
    command,
  )
}
