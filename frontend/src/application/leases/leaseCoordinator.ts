import {
  getLeases,
  getLease,
} from "../../api/resources/leaseResource"
import {
  adaptLease,
} from "../../lib/adapters/leaseAdapter"

export function createLeaseCoordinator() {
  return {
    async list() {
      const result =
        await getLeases<unknown>()

      if (!Array.isArray(result)) {
        return []
      }

      return result.map((item) =>
        adaptLease(
          item as Record<string, unknown>,
        ),
      )
    },

    async get(id: string) {
      const result =
        await getLease<unknown>(id)

      return adaptLease(
        result as Record<string, unknown>,
      )
    },
  }
}
