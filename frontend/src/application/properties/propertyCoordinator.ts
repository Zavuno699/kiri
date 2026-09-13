import {
  getProperties,
  getProperty,
} from "../../api/resources/propertyResource"
import {
  adaptProperty,
} from "../../lib/adapters/propertyAdapter"

export function createPropertyCoordinator() {
  return {
    async list() {
      const result =
        await getProperties<unknown>()

      if (!Array.isArray(result)) {
        return []
      }

      return result.map((item) =>
        adaptProperty(
          item as Record<string, unknown>,
        ),
      )
    },

    async get(id: string) {
      const result =
        await getProperty<unknown>(id)

      return adaptProperty(
        result as Record<string, unknown>,
      )
    },
  }
}
