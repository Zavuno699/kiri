import type { PageDataState } from "../../../application/page-data/core/pageDataState"

export interface LockPageController {
  load(
    query?: unknown,
  ): Promise<PageDataState>
  refresh(): Promise<PageDataState>
}

export function createLockPageController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
  refresh?: () => Promise<unknown>,
): LockPageController {
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
