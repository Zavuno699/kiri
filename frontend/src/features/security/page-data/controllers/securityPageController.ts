import type { PageDataState } from "../../../../application/page-data/core/pageDataState"

export interface SecurityPageController {
  load(
    query?: unknown,
  ): Promise<PageDataState>
  refresh(): Promise<PageDataState>
}

export function createSecurityPageController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
  refresh?: () => Promise<unknown>,
): SecurityPageController {
  return {
    async load(query) {
      try {
        const data = await load(query)

        return {
          pageId: "security",
          loading: false,
          stale: false,
          error: null,
          data,
        }
      } catch (error) {
        return {
          pageId: "security",
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
          pageId: "security",
          loading: false,
          stale: false,
          error: null,
          data,
        }
      } catch (error) {
        return {
          pageId: "security",
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
