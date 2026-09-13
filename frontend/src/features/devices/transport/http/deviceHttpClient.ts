import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface DeviceHttpClient {
  transport: HttpTransport
}

export function createDeviceHttpClient(
  transport: HttpTransport,
): DeviceHttpClient {
  return {
    transport,
  }
}
