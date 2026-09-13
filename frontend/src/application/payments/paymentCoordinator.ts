import {
  getPayments,
  getPayment,
} from "../../api/resources/paymentResource"
import {
  adaptPayment,
} from "../../lib/adapters/paymentAdapter"

export function createPaymentCoordinator() {
  return {
    async list() {
      const result =
        await getPayments<unknown>()

      if (!Array.isArray(result)) {
        return []
      }

      return result.map((item) =>
        adaptPayment(
          item as Record<string, unknown>,
        ),
      )
    },

    async get(id: string) {
      const result =
        await getPayment<unknown>(id)

      return adaptPayment(
        result as Record<string, unknown>,
      )
    },
  }
}
