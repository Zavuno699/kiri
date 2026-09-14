import type { PageDataState } from "../../../../application/page-data/core/pageDataState"

export interface DevicePageController {
  load(
    query?: unknown,
  ): Promise<PageDataState>
  refresh(): Promise<PageDataState>
}

export function createDevicePageController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
  refresh?: () => Promise<unknown>,
): DevicePageController {
  return {
    async load(query) {
      try {
        const data = await load(query)

        return {
          pageId: "devices",
          loading: false,
          stale: false,
          error: null,
          data,
        }
      } catch (error) {
        return {
          pageId: "devices",
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
          pageId: "devices",
          loading: false,
          stale: false,
          error: null,
          data,
        }
      } catch (error) {
        return {
          pageId: "devices",
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
