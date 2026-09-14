import type { PageDataState } from "../../../../application/page-data/core/pageDataState"

export function selectLeasePageData<T>(
  state: PageDataState<T>,
): T | null {
  return state.data
}
