import type { HttpTransport } from "../../../../application/transport/http/httpTransport"

export interface PaymentHttpClient {
  transport: HttpTransport
}

export function createPaymentHttpClient(
  transport: HttpTransport,
): PaymentHttpClient {
  return {
    transport,
  }
}
