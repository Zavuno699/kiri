import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface PaymentStatusClient {
  get(id: string): Promise<unknown>
}

export function createPaymentStatusClient(
  client: ResourceClient,
): PaymentStatusClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "payments:status:" + id,
          domain: "payments",
          path: "/api/v1/payments/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Payments status request failed.",
        )
      }

      return response.data
    },
  }
}
