import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface PaymentDetailClient {
  get(id: string): Promise<unknown>
}

export function createPaymentDetailClient(
  client: ResourceClient,
): PaymentDetailClient {
  return {
    async get(id) {
      const response =
        await client.execute({
          key: "payments:" + id,
          domain: "payments",
          path: "/api/v1/payments/" + id,
          method: "GET",
        })

      if (!response.ok) {
        throw new Error(
          "Payments detail request failed.",
        )
      }

      return response.data
    },
  }
}
