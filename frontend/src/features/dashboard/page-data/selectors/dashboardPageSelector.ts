import type { PageDataState } from "../../../application/page-data/core/pageDataState"

export function selectDashboardPageData<T>(
  state: PageDataState<T>,
): T | undefined {
  return state.data
}
