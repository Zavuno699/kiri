import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface PropertyHttpClient {
  transport: HttpTransport
}

export function createPropertyHttpClient(
  transport: HttpTransport,
): PropertyHttpClient {
  return {
    transport,
  }
}
