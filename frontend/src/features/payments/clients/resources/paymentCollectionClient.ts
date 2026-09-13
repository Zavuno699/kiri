import type { ResourceClient } from "../../../application/resources/clients/resourceClient"

export interface PaymentCollectionClient {
  list(
    query?: Record<string, unknown>,
  ): Promise<unknown[]>
}

export function createPaymentCollectionClient(
  client: ResourceClient,
): PaymentCollectionClient {
  return {
    async list(query) {
      const response =
        await client.execute({
          key: "payments:list",
          domain: "payments",
          path: "/api/v1/payments",
          method: "GET",
          query,
        })

      if (!response.ok) {
        throw new Error(
          "Payments collection request failed.",
        )
      }

      if (
        response.data &&
        typeof response.data === "object" &&
        "items" in response.data
      ) {
        const data =
          response.data as {
            items?: unknown[]
          }

        return data.items ?? []
      }

      return []
    },
  }
}
