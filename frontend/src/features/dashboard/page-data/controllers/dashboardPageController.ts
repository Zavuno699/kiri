import type { PageDataState } from "../../../application/page-data/core/pageDataState"

export interface DashboardPageController {
  load(
    query?: unknown,
  ): Promise<PageDataState>
  refresh(): Promise<PageDataState>
}

export function createDashboardPageController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
  refresh?: () => Promise<unknown>,
): DashboardPageController {
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
