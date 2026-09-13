import type { PageDataState } from "../../../application/page-data/core/pageDataState"

export function selectDevicePageData<T>(
  state: PageDataState<T>,
): T | undefined {
  return state.data
}
