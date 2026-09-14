import type { PageDataState } from "../../../../application/page-data/core/pageDataState"

export function selectLockPageData<T>(
  state: PageDataState<T>,
): T | null {
  return state.data
}
