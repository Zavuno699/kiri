import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface LockHttpClient {
  transport: HttpTransport
}

export function createLockHttpClient(
  transport: HttpTransport,
): LockHttpClient {
  return {
    transport,
  }
}
