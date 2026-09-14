import type { ResourceClient } from "../../../../application/resources/clients/resourceClient"

export interface PaymentDetailClient {
  get(id: string): Promise<unknown>
}

export function createPaymentDetailClient(
  client: ResourceClient,
): PaymentDetailClient {
  return {
    async get(id) {
      const response = (client as any).execute ?
        await (client as any).execute({
          key: "payments:" + id,
          domain: "payments",
          path: "/api/v1/payments/" + id,
          method: "GET",
        }) :
        await client.get(id);

      if (!response.ok) {
        throw new Error(
          "Payments detail request failed.",
        )
      }

      return response.data
    },
  }
}
