import {
  sendDashboardCommand,
} from "../../clients/commands/dashboardCommandClient"

export async function writeDashboardFlow(
  type: string,
  payload?: unknown,
): Promise<unknown> {
  return sendDashboardCommand({
    type,
    payload,
  })
}
