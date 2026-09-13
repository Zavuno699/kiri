import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface LeaseHttpClient {
  transport: HttpTransport
}

export function createLeaseHttpClient(
  transport: HttpTransport,
): LeaseHttpClient {
  return {
    transport,
  }
}
