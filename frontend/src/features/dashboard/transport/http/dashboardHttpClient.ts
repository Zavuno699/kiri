import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface DashboardHttpClient {
  transport: HttpTransport
}

export function createDashboardHttpClient(
  transport: HttpTransport,
): DashboardHttpClient {
  return {
    transport,
  }
}
