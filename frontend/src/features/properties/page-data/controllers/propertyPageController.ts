import type { PageDataState } from "../../../application/page-data/core/pageDataState"

export interface PropertyPageController {
  load(
    query?: unknown,
  ): Promise<PageDataState>
  refresh(): Promise<PageDataState>
}

export function createPropertyPageController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
  refresh?: () => Promise<unknown>,
): PropertyPageController {
  return {
    async load(query) {
      try {
        const data = await load(query)

        return {
          lifecycle: "ready",
          data,
          updatedAt: new Date().toISOString(),
        }
      } catch (error) {
        return {
          lifecycle: "error",
          error:
            error instanceof Error
              ? error.message
              : "Page load failed.",
        }
      }
    },

    async refresh() {
      try {
        const data = await (
          refresh ?? (() => load())
        )()

        return {
          lifecycle: "ready",
          data,
          updatedAt: new Date().toISOString(),
        }
      } catch (error) {
        return {
          lifecycle: "error",
          error:
            error instanceof Error
              ? error.message
              : "Page refresh failed.",
        }
      }
    },
  }
}
