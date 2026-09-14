import type { PageDataState } from "../../../../application/page-data/core/pageDataState"

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
          pageId: "dashboard",
          loading: false,
          stale: false,
          error: null,
          data,
        }
      } catch (error) {
        return {
          pageId: "dashboard",
          loading: false,
          stale: false,
          error:
            error instanceof Error
              ? error.message
              : "Page load failed.",
          data: null,
        }
      }
    },

    async refresh() {
      try {
        const data = await (
          refresh ?? (() => load())
        )()

        return {
          pageId: "dashboard",
          loading: false,
          stale: false,
          error: null,
          data,
        }
      } catch (error) {
        return {
          pageId: "dashboard",
          loading: false,
          stale: false,
          error:
            error instanceof Error
              ? error.message
              : "Page refresh failed.",
          data: null,
        }
      }
    },
  }
}
