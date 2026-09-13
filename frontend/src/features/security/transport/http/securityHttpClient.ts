import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface SecurityHttpClient {
  transport: HttpTransport
}

export function createSecurityHttpClient(
  transport: HttpTransport,
): SecurityHttpClient {
  return {
    transport,
  }
}
