import type { PageDataState } from "../../../../application/page-data/core/pageDataState"

export function selectDevicePageData<T>(
  state: PageDataState<T>,
): T | null {
  return state.data
}
